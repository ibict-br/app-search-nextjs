/* eslint-disable @typescript-eslint/ban-ts-comment */
type BoolType = {
  bool: {
    must: any[];
    should: any[];
    must_not: any[];
    minimum_should_match?: number;
  };
};

type BoolShouldType = {
  bool: {
    should: any[];
  };
};

class QueryFormat {
  private queryBase: BoolType = {
    bool: {
      must: [],
      should: [],
      must_not: [],
    },
  };

  private readonly ALL_FIELDS = 'all';

  public toElasticsearch(input: string, allFields: string[]) {
    try {
      const items = input.split(')');
      items.pop();
      for (let index = 0; index < items.length; index++) {
        const [operator, query] = items[index].split('(');
        if (index == 0) {
          const [field, value] = query.split(':');
          if (field === this.ALL_FIELDS) {
            allFields.forEach((field) => {
              this.fillQuery('OR', field, value, []);
            });
          } else {
            //@ts-ignore
            let nextOperator = index + 1 < items.length ? items[index + 1].split('(').shift().trim() : 'AND';
            if (nextOperator === 'AND NOT') {
              nextOperator = 'AND';
            }
            this.fillQuery(nextOperator, field, value, []);
          }
        } else {
          const [field, value] = query.split(':');
          this.fillQuery(operator, field, value, allFields);
        }
      }
      if (this.queryBase.bool?.should?.length > 0) {
        this.queryBase.bool.minimum_should_match = 1;
      }
      return this.queryBase;
    } catch (err) {
      throw err;
    }
  }

  private fillQuery(operator: string, field: string, value: string, allFields: string[]) {
    try {
      this.validQuery(operator, field, value);
      const match = value.startsWith('"') && value.endsWith('"') ? 'match_phrase' : 'match';
      if (value === '*') {
        this.queryBase.bool.must.push({
          match_all: {},
        });
      } else if (field === this.ALL_FIELDS) {
        if (operator.trim() === 'AND') {
          const subQuery: BoolShouldType = {
            bool: {
              should: [],
            },
          };
          allFields.forEach((fieldName) => {
            subQuery.bool.should.push({
              [match]: {
                [fieldName]: value.replaceAll('"', ''),
              },
            });
          });
          this.queryBase.bool.must.push(subQuery);
        } else if (operator.trim() === 'OR') {
          allFields.forEach((fieldName) => {
            this.shouldQuery(match, fieldName, value);
          });
        } else {
          allFields.forEach((fieldName) => {
            this.mustNotQuery(match, fieldName, value);
          });
        }
      } else if (operator.trim() === 'AND') {
        this.mustQuery(match, field, value);
      } else if (operator.trim() === 'OR') {
        this.shouldQuery(match, field, value);
      } else if (operator.trim() === 'AND NOT') {
        this.mustNotQuery(match, field, value);
      }
    } catch (err) {
      throw err;
    }
  }

  private mustNotQuery(match: string, field: string, value: string) {
    this.queryBase.bool.must_not.push({
      [match]: {
        [field]: value.replaceAll('"', ''),
      },
    });
  }

  private mustQuery(match: string, field: string, value: string) {
    this.queryBase.bool.must.push({
      [match]: {
        [field]: value.replaceAll('"', ''),
      },
    });
  }

  private shouldQuery(match: string, field: string, value: string) {
    this.queryBase.bool.should.push({
      [match]: {
        [field]: value.replaceAll('"', ''),
      },
    });
  }

  private validQuery(operator: string, field: string, value: string) {
    if (!operator || !field || !value) {
      throw Error('Invalid search query');
    }
  }
}

export default QueryFormat;
