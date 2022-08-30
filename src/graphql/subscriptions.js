/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateServiceman = /* GraphQL */ `
  subscription OnCreateServiceman(
    $filter: ModelSubscriptionServicemanFilterInput
  ) {
    onCreateServiceman(filter: $filter) {
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
export const onUpdateServiceman = /* GraphQL */ `
  subscription OnUpdateServiceman(
    $filter: ModelSubscriptionServicemanFilterInput
  ) {
    onUpdateServiceman(filter: $filter) {
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
export const onDeleteServiceman = /* GraphQL */ `
  subscription OnDeleteServiceman(
    $filter: ModelSubscriptionServicemanFilterInput
  ) {
    onDeleteServiceman(filter: $filter) {
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
export const onCreateMCSignupinfo = /* GraphQL */ `
  subscription OnCreateMCSignupinfo(
    $filter: ModelSubscriptionMCSignupinfoFilterInput
  ) {
    onCreateMCSignupinfo(filter: $filter) {
      id
      contract_type
      notes
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMCSignupinfo = /* GraphQL */ `
  subscription OnUpdateMCSignupinfo(
    $filter: ModelSubscriptionMCSignupinfoFilterInput
  ) {
    onUpdateMCSignupinfo(filter: $filter) {
      id
      contract_type
      notes
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMCSignupinfo = /* GraphQL */ `
  subscription OnDeleteMCSignupinfo(
    $filter: ModelSubscriptionMCSignupinfoFilterInput
  ) {
    onDeleteMCSignupinfo(filter: $filter) {
      id
      contract_type
      notes
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMCPropertyinfo = /* GraphQL */ `
  subscription OnCreateMCPropertyinfo(
    $filter: ModelSubscriptionMCPropertyinfoFilterInput
  ) {
    onCreateMCPropertyinfo(filter: $filter) {
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
export const onUpdateMCPropertyinfo = /* GraphQL */ `
  subscription OnUpdateMCPropertyinfo(
    $filter: ModelSubscriptionMCPropertyinfoFilterInput
  ) {
    onUpdateMCPropertyinfo(filter: $filter) {
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
export const onDeleteMCPropertyinfo = /* GraphQL */ `
  subscription OnDeleteMCPropertyinfo(
    $filter: ModelSubscriptionMCPropertyinfoFilterInput
  ) {
    onDeleteMCPropertyinfo(filter: $filter) {
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
export const onCreateServices = /* GraphQL */ `
  subscription OnCreateServices($filter: ModelSubscriptionServicesFilterInput) {
    onCreateServices(filter: $filter) {
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
export const onUpdateServices = /* GraphQL */ `
  subscription OnUpdateServices($filter: ModelSubscriptionServicesFilterInput) {
    onUpdateServices(filter: $filter) {
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
export const onDeleteServices = /* GraphQL */ `
  subscription OnDeleteServices($filter: ModelSubscriptionServicesFilterInput) {
    onDeleteServices(filter: $filter) {
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
export const onCreateServiceDetails = /* GraphQL */ `
  subscription OnCreateServiceDetails(
    $filter: ModelSubscriptionServiceDetailsFilterInput
  ) {
    onCreateServiceDetails(filter: $filter) {
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
export const onUpdateServiceDetails = /* GraphQL */ `
  subscription OnUpdateServiceDetails(
    $filter: ModelSubscriptionServiceDetailsFilterInput
  ) {
    onUpdateServiceDetails(filter: $filter) {
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
export const onDeleteServiceDetails = /* GraphQL */ `
  subscription OnDeleteServiceDetails(
    $filter: ModelSubscriptionServiceDetailsFilterInput
  ) {
    onDeleteServiceDetails(filter: $filter) {
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
