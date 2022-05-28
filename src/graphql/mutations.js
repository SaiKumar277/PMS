/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createServiceman = /* GraphQL */ `
  mutation CreateServiceman(
    $input: CreateServicemanInput!
    $condition: ModelServicemanConditionInput
  ) {
    createServiceman(input: $input, condition: $condition) {
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
export const updateServiceman = /* GraphQL */ `
  mutation UpdateServiceman(
    $input: UpdateServicemanInput!
    $condition: ModelServicemanConditionInput
  ) {
    updateServiceman(input: $input, condition: $condition) {
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
export const deleteServiceman = /* GraphQL */ `
  mutation DeleteServiceman(
    $input: DeleteServicemanInput!
    $condition: ModelServicemanConditionInput
  ) {
    deleteServiceman(input: $input, condition: $condition) {
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
export const createJinfo = /* GraphQL */ `
  mutation CreateJinfo(
    $input: CreateJinfoInput!
    $condition: ModelJinfoConditionInput
  ) {
    createJinfo(input: $input, condition: $condition) {
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
export const updateJinfo = /* GraphQL */ `
  mutation UpdateJinfo(
    $input: UpdateJinfoInput!
    $condition: ModelJinfoConditionInput
  ) {
    updateJinfo(input: $input, condition: $condition) {
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
export const deleteJinfo = /* GraphQL */ `
  mutation DeleteJinfo(
    $input: DeleteJinfoInput!
    $condition: ModelJinfoConditionInput
  ) {
    deleteJinfo(input: $input, condition: $condition) {
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
