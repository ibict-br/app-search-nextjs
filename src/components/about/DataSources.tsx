/* eslint-disable react/no-unescaped-entities */
const DataSources = () => {
  return (
    <>
      <p>
        O BrCris desempenha um papel fundamental na agregação de um amplo conjunto de fontes de dados essenciais para
        compreender o Ecossistema de Informação da Pesquisa Científica Brasileira. Essas informações valiosas só são
        possíveis graças à integração de diversos conjuntos de dados relevantes. Entre as principais fontes de dados
        coletadas pelo BrCris, destacam-se:
      </p>
      <p>
        <a href="https://lattes.cnpq.br/" target="_blank" rel="noreferrer">
          Plataforma Lattes
        </a>
        : Padrão nacional no registro da vida pregressa e atual dos estudantes e pesquisadores do país.
        <br />
        Fonte para as Entidades: <b>Pessoas, Publicações, Revistas, Organizações, PPG's, Patentes e Software.</b>
      </p>
      <p>
        {' '}
        <a href="http://di.cnpq.br/di/index.jsp" target="_blank" rel="noreferrer">
          Diretório de Instituições
        </a>
        : Disponibiliza informações sobre as organizações que compõem o Sistema Nacional de Ciência, Tecnologia e
        Inovação (Sistema Nacional de CT&I).
        <br />
        Fonte para a Entidade: <b>Organizações</b>.
      </p>
      <p>
        <a href="https://lattes.cnpq.br/web/dgp" target="_blank" rel="noreferrer">
          Diretório dos Grupos de Pesquisa
        </a>
        : Inventário dos grupos de pesquisa em atividade no país. <br />
        Fonte para a Entidade: <b>Grupos de Pesquisa</b>.{' '}
      </p>
      <p>
        <a href="https://openalex.org/" target="_blank" rel="noreferrer">
          OpenAlex
        </a>
        : Catálogo gratuito e aberto de publicações científicas, autores, instituições e periódicos.
        <br />
        Fonte para as Entidades: <b>Publicações, Revistas e Organizações</b>.
      </p>
      <p>
        <a href="https://oasisbr.ibict.br/ " target="_blank" rel="noreferrer">
          Oasisbr
        </a>
        : Reúne a produção científica e os dados de pesquisa em acesso aberto, publicados em revistas científicas,
        repositórios digitais de publicações científicas, repositórios digitais de dados de pesquisa e bibliotecas
        digitais de teses e dissertações.
        <br />
        <b>Fonte para as Entidades: Publicações e PPG's</b>.
      </p>
      <p>
        <a href="https://graph.openaire.eu/ " target="_blank" rel="noreferrer">
          Openaire Research Graph
        </a>
        : Agregador de dados e relações entre agentes de pesquisa científica como publicações, software e organizações.
        <br />
        Fonte para as Entidades: <b>Publicações e Organizações</b>.{' '}
      </p>
      <p>
        <a href="https://dadosabertos.capes.gov.br/ " target="_blank" rel="noreferrer">
          Dados Abertos Capes
        </a>
        : Dados e informações sobre a pós-graduação brasileira.
        <br />
        Fonte para as Entidades: <b>Publicações, Organizações e PPG's</b>.{' '}
      </p>
      <p>
        <a href="https://sucupira.capes.gov.br/ " target="_blank" rel="noreferrer">
          Plataforma Sucupira
        </a>
        : Sistema de coleta de informações, análises e avaliações a serem utilizadas como base padronizadora do Sistema
        Nacional de Pós-Graduação brasileira.
        <br />
        Fonte para as Entidades: <b>Revistas e PPG's</b>.{' '}
      </p>{' '}
      <p>
        <a href="https://doaj.org/ " target="_blank" rel="noreferrer">
          DOAJ
        </a>
        : Índice com dados sobre periódicos de acesso aberto.
        <br />
        Fonte para as Entidades: <b>Publicações e Revistas</b>.
      </p>{' '}
      <p>
        {' '}
        <a href="https://worldwide.espacenet.com/ " target="_blank" rel="noreferrer">
          Espacenet
        </a>
        : Serviço online fornecido pelo Escritório Europeu de Patentes (EPO) que oferece acesso a uma das maiores bases
        de dados de patentes do mundo. <br />
        Fonte para a Entidade: <b>Patentes</b>.
      </p>{' '}
      <p>
        {' '}
        <a href="https://www.gov.br/inpi " target="_blank" rel="noreferrer">
          INPI
        </a>
        : Responsável pela concessão e proteção de direitos de propriedade industrial no país.
        <br />
        Fonte para as Entidades:<b> Patentes e Software</b>.{' '}
      </p>{' '}
      <p>
        <a href="https://ndltd.org/ " target="_blank" rel="noreferrer">
          NDLTD
        </a>
        : Promover a adoção, criação, uso, disseminação e preservação de teses e dissertações eletrônicas (ETD). <br />
        Fonte para a Entidade: <b>Publicações</b>.{' '}
      </p>{' '}
      <p>
        <a href="https://ror.org/ " target="_blank" rel="noreferrer">
          ROR
        </a>
        : Fornece identificadores únicos e persistentes para instituições acadêmicas e de pesquisa em todo o mundo.
        <br />
        Fonte para a Entidade: <b>Organizações</b>.{' '}
      </p>{' '}
      <p>
        <a href="https://www.wikidata.org/ " target="_blank" rel="noreferrer">
          {' '}
          Wikidata
        </a>
        : Fornece uma base de conhecimento estruturada e livremente acessível. Funciona como um banco de dados
        centralizado que armazena e fornece dados estruturados sobre uma ampla variedade de elementos.
        <br />
        Fonte para a Entidade: <b>Organizações</b>.
      </p>
    </>
  );
};

export default DataSources;
