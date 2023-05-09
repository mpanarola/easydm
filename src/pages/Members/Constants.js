export const isArrayEquals = (a, b) => {
	return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
};
  // User Type
  export const optionGroupType = [
    {
      label: "Type",
      options: [
        { label: "DM Executive", value: "DM Executive" },
        { label: "Graphic Designer", value: "Graphic Designer" },
        { label: "Content Writer", value: "Content Writer" },
      ],
    },
   
  ];

  // User Status
  export const optionGroupStaus = [
    {
      label: "Type",
      options: [
        { label: "Active", value: true },
        { label: "InActive", value: false },
      ],
    },
   
  ];

  export const columns = [
    {
      label: "ID",
      field: "id",
      sort: "asc",
      width: 150,
    },
    {
      label: "Photo",
      field: "avatar",
      sort: "asc",
      width: 150,
    },
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 100,
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 270,
    },
    {
      label: "Type",
      field: "userType",
      sort: "asc",
      width: 200,
    },
    {
      label: "Status",
      field: "isActive",
      sort: "asc",
      width: 150,
    },
    {
      label: "Created On",
      field: "createdAt",
      sort: "asc",
      width: 100,
    },
    {
      label: "Action",
      field: "action",
      width: 200,
    },
   
  ];

  export const payload =  {
    "options": {
      "sort": {
        "createdAt": [1/-1]
    }
    }
  }