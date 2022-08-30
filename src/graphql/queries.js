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
      calloutcharge
      phonenumber
      image
      rating
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
        calloutcharge
        phonenumber
        image
        rating
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMCSignupinfo = /* GraphQL */ `
  query GetMCSignupinfo($id: ID!) {
    getMCSignupinfo(id: $id) {
      id
      contract_type
      notes
      createdAt
      updatedAt
    }
  }
`;
export const listMCSignupinfos = /* GraphQL */ `
  query ListMCSignupinfos(
    $filter: ModelMCSignupinfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMCSignupinfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        contract_type
        notes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMCPropertyinfo = /* GraphQL */ `
  query GetMCPropertyinfo($id: ID!) {
    getMCPropertyinfo(id: $id) {
      id
      name
      city
      region
      postcode
      county
      country
      created_by
      createdAt
      updatedAt
    }
  }
`;
export const listMCPropertyinfos = /* GraphQL */ `
  query ListMCPropertyinfos(
    $filter: ModelMCPropertyinfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMCPropertyinfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        city
        region
        postcode
        county
        country
        created_by
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getServices = /* GraphQL */ `
  query GetServices($id: ID!) {
    getServices(id: $id) {
      id
      category
      schedule
      day
      blockid
      istarttime
      iendtime
      startdate
      serviceman
      servicemanid
      sm_assigned
      block_name
      created_by
      notes
      smtime
      createdAt
      updatedAt
    }
  }
`;
export const listServices = /* GraphQL */ `
  query ListServices(
    $filter: ModelServicesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category
        schedule
        day
        blockid
        istarttime
        iendtime
        startdate
        serviceman
        servicemanid
        sm_assigned
        block_name
        created_by
        notes
        smtime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getServiceDetails = /* GraphQL */ `
  query GetServiceDetails($id: ID!) {
    getServiceDetails(id: $id) {
      id
      startimgs
      starttime
      endimgs
      endtime
      servicesid
      blockid
      serviceman
      category
      servicemanid
      block
      createdAt
      updatedAt
    }
  }
`;
export const listServiceDetails = /* GraphQL */ `
  query ListServiceDetails(
    $filter: ModelServiceDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServiceDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        startimgs
        starttime
        endimgs
        endtime
        servicesid
        blockid
        serviceman
        category
        servicemanid
        block
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
