export const columns = [
  {
    label: "ID",
    field: "id",
    sort: "asc",
    width: 150,
  },
  {
    label: "Web Page",
    field: "webpage",
    sort: "asc",
    width: 150,
  },
  {
    label: "Published On",
    field: "date",
    sort: "asc",
    width: 200,
  },
  {
    label: "Category",
    field: "category",
    sort: "asc",
    width: 270,
  },

  {
    label: "Month-Year",
    field: "month_year",
    sort: "asc",
    width: 200,
  },
  {
    label: "No. Of Page Views",
    field: "total_pageviews",
    sort: "asc",
    width: 270,
  },

  {
    label: "Action",
    field: "action",
    width: 200,
  },

];

export const webpages_payload = {
  "options": {
    "select": ['webpage', 'webpageUrl', 'category', 'publishedOn']
  }
}

export const pageviews_payload = {
  "options": {
    "populate": [
      {
        "path": "webpage",
        "select": ["webpage", "webpageUrl", "category"]
      }
    ]
  }
}

export const optionGroupCategory = [
  {
    label: "Category",
    options: [
      { label: "Services", value: "Services" },
      { label: "Industry", value: "Industry" },
      { label: "Technologies", value: "Technologies" },
      { label: "Career", value: "Career" },
      { label: "Blogs", value: "Blogs" }
    ],
  },

];