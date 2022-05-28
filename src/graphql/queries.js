/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getServiceman = /* GraphQL */ `
  query GetServiceman($id: ID!) {
    getServiceman(id: $id) {
      id
      name
      age
      sex
      category
      address
      postcode
      county
      phonenumber
      image
      createdAt
      updatedAt
    }
  }
`;
export const listServicemen = /* GraphQL */ `
  query ListServicemen(
    $filter: ModelServicemanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServicemen(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        age
        sex
        category
        address
        postcode
        county
        phonenumber
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getJinfo = /* GraphQL */ `
  query GetJinfo($id: ID!) {
    getJinfo(id: $id) {
      id
      created_by
      block_name
      category
      schedule
      day
      time
      createdAt
      updatedAt
    }
  }
`;
export const listJinfos = /* GraphQL */ `
  query ListJinfos(
    $filter: ModelJinfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJinfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        created_by
        block_name
        category
        schedule
        day
        time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
