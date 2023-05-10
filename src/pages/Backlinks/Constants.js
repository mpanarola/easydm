
export const webpage_payload = {
  "options": {
    "populate": [
      {
        "path": "webpage",
        "select": ["webpage", "webpageUrl", "category", "publishedOn"]
      }
    ]
  }
}

export const optionGroupWebPage = [
  {
    label: "Web Pages",
    options: [
      { label: "Home", value: "Home" },
      { label: "About", value: "About" },
      { label: "Contact", value: "Contact" },
      { label: "Blogs", value: "Blogs" },
      { label: "Events", value: "Events" },
    ],
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
      { label: "Blogs", value: "Blogs" }
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
    label: "Web Page",
    field: "webpage",
    sort: "asc",
    width: 150,
  },
  {
    label: "Web Page Search",
    field: "webpage_dummy",
    sort: "asc",
    width: 150,
  },
  {
    label: "Web Page Search",
    field: "webpage_url_search",
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
    label: "No. Of Back Links",
    field: "total_backlinks",
    sort: "asc",
    width: 170,
  },
  {
    label: "Action",
    field: "action",
    width: 250,
  },

];