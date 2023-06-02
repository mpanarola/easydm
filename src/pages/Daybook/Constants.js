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
    width: 150,
    sort: "disabled",
  },
  {
    label: "Name",
    field: "name",
    sort: "asc",
    width: 270,
  },
  {
    label: "Dates",
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
    sort: "disabled",
  },

];

export const optionGroupCategory = [
  {
    label: "Category",
    options: [
      { label: "Services", value: "Services" },
      { label: "Industry", value: "Industry" },
      { label: "Technologies", value: "Technologies" },
      { label: "Career", value: "Career" },
      { label: "Blog Etc", value: "Blogs" }
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
      { label: "Services", value: "Services" },
      { label: "Industry", value: "Industry" },
      { label: "Technologies", value: "Technologies" },
      { label: "Career", value: "Career" },
      { label: "Blog Etc", value: "Blogs" }
    ],
  },

];

export const webpagesPayload = {
  "options": {
    "select": ['webpage', 'webpageUrl', 'category', 'publishedOn']
  }
}

export const reportDaybookcolumns = [
  {
    label: "ID",
    field: "id",
    sort: "asc",
    width: 150,
  },
  {
    label: "Photo",
    field: "photo",
    sort: "disabled",
    width: 150,
  },
  {
    label: "Name",
    field: "name",
    sort: "asc",
    width: 270,
  },

  {
    label: "Hours",
    field: "hours",
    sort: "asc",
    width: 270,
  },

];