export const ALL_PAGES_QUERY = `
  query getAllPages{
    pages {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;

export const PAGE_QUERY = `
  query getOnePage($id: ID!){
    page(id: $id){
      data {
        id
        attributes {
          title
          content_blocks {
            data {
              id
              attributes {
                content
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_PAGE_MUTATION = `
  mutation createPage ($title: String!) {
    createPage(data: { title: $title }) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;

export const UPDATE_PAGE_MUTATION = `
  mutation updatePage ($id: ID!, $title: String!) {
    updatePage (id: $id, data: { title: $title}) {
      data {
        id
        attributes {
          title
          content_blocks {
            data {
              id
              attributes {
                content
              }
            }
          }
        }
      }
    }
  }
`;

export const DELETE_PAGE_MUTATION = `
  mutation deletePage ($id: ID!)  {
    deletePage (id: $id) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;

export const CREATE_BLOCKS_MUTATION = `
  mutation createContentBlock ($content: String!, $pageId: ID!){
    createContentBlock(
      data: { 
        content: $content
        page: $pageId
      }
    ){
      data {
        id
        attributes {
          content
          page {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_BLOCKS_MUTATION = `
  mutation updateContentBlock ($id: ID!, $content: String!) {
    updateContentBlock(id: $id, data: { content: $content}){
      data {
        id
        attributes {
          content
        }
      }
    }
  }
`;

export const DELETE_BLOCK_MUTATION = `
  mutation deleteContentBlock ($id: ID!) {
    deleteContentBlock(id: $id) {
      data {
        id
        attributes {
          content
        }
      }
    }
  }
`;