
export const columns = [
    {
      label: "ID",
      field: "id",
      sort: "asc",
      width: 150,
    },
    {
      label: "Photo",
      field: "photo",
      sort: "asc",
      width: 150,
    },
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 270,
    },
    {
      label: "Date",
      field: "date",
      sort: "asc",
      width: 200,
    },
    {
      label: "Hours",
      field: "hours",
      sort: "asc",
      width: 270,
    },
    {
      label: "Action",
      field: "action",
      width: 200,
    },

  ];

  export const optionGroupCategory = [
    {
      label: "Category",
      options: [
        { label: "Blog", value: "Blog"  },
        { label: "Article", value: "Article" },
        { label: "eBook", value: "eBook" },
        { label: "Infographics", value: "Infographics" },
        { label: "PPT", value: "PPT" },
      ],
    },
  
  ];

  export const memberPayload = {
    "options": {
      "select": ['name']
    }
  }


  export const webpagePayload = {
    "options": {
      "select": ['webpage', 'webpageUrl']
    }
  }


export const optionCategory = [
  {
    label: "Category",
    options: [
      { label: "Services", value: "services" },
      { label: "Industry", value: "industry" },
      { label: "Technologies", value: "technologies" },
      { label: "Career", value: "career" },
      { label: "Blogs", value: "blogs" }
    ],
  },

];

export const webpagesPayload =  {
  "options": {
    "select": ['webpage', 'webpageUrl', 'category', 'publishedOn']
  }
}