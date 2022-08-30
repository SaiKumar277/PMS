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
      calloutcharge
      phonenumber
      image
      rating
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
      calloutcharge
      phonenumber
      image
      rating
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
      calloutcharge
      phonenumber
      image
      rating
      createdAt
      updatedAt
    }
  }
`;
export const createMCSignupinfo = /* GraphQL */ `
  mutation CreateMCSignupinfo(
    $input: CreateMCSignupinfoInput!
    $condition: ModelMCSignupinfoConditionInput
  ) {
    createMCSignupinfo(input: $input, condition: $condition) {
      id
      contract_type
      notes
      createdAt
      updatedAt
    }
  }
`;
export const updateMCSignupinfo = /* GraphQL */ `
  mutation UpdateMCSignupinfo(
    $input: UpdateMCSignupinfoInput!
    $condition: ModelMCSignupinfoConditionInput
  ) {
    updateMCSignupinfo(input: $input, condition: $condition) {
      id
      contract_type
      notes
      createdAt
      updatedAt
    }
  }
`;
export const deleteMCSignupinfo = /* GraphQL */ `
  mutation DeleteMCSignupinfo(
    $input: DeleteMCSignupinfoInput!
    $condition: ModelMCSignupinfoConditionInput
  ) {
    deleteMCSignupinfo(input: $input, condition: $condition) {
      id
      contract_type
      notes
      createdAt
      updatedAt
    }
  }
`;
export const createMCPropertyinfo = /* GraphQL */ `
  mutation CreateMCPropertyinfo(
    $input: CreateMCPropertyinfoInput!
    $condition: ModelMCPropertyinfoConditionInput
  ) {
    createMCPropertyinfo(input: $input, condition: $condition) {
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
export const updateMCPropertyinfo = /* GraphQL */ `
  mutation UpdateMCPropertyinfo(
    $input: UpdateMCPropertyinfoInput!
    $condition: ModelMCPropertyinfoConditionInput
  ) {
    updateMCPropertyinfo(input: $input, condition: $condition) {
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
export const deleteMCPropertyinfo = /* GraphQL */ `
  mutation DeleteMCPropertyinfo(
    $input: DeleteMCPropertyinfoInput!
    $condition: ModelMCPropertyinfoConditionInput
  ) {
    deleteMCPropertyinfo(input: $input, condition: $condition) {
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
export const createServices = /* GraphQL */ `
  mutation CreateServices(
    $input: CreateServicesInput!
    $condition: ModelServicesConditionInput
  ) {
    createServices(input: $input, condition: $condition) {
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
export const updateServices = /* GraphQL */ `
  mutation UpdateServices(
    $input: UpdateServicesInput!
    $condition: ModelServicesConditionInput
  ) {
    updateServices(input: $input, condition: $condition) {
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
export const deleteServices = /* GraphQL */ `
  mutation DeleteServices(
    $input: DeleteServicesInput!
    $condition: ModelServicesConditionInput
  ) {
    deleteServices(input: $input, condition: $condition) {
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
export const createServiceDetails = /* GraphQL */ `
  mutation CreateServiceDetails(
    $input: CreateServiceDetailsInput!
    $condition: ModelServiceDetailsConditionInput
  ) {
    createServiceDetails(input: $input, condition: $condition) {
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
export const updateServiceDetails = /* GraphQL */ `
  mutation UpdateServiceDetails(
    $input: UpdateServiceDetailsInput!
    $condition: ModelServiceDetailsConditionInput
  ) {
    updateServiceDetails(input: $input, condition: $condition) {
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
export const deleteServiceDetails = /* GraphQL */ `
  mutation DeleteServiceDetails(
    $input: DeleteServiceDetailsInput!
    $condition: ModelServiceDetailsConditionInput
  ) {
    deleteServiceDetails(input: $input, condition: $condition) {
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
