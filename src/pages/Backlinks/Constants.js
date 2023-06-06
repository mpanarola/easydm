
export const webpage_payload = {
  "options": {
    "populate": [
      {
        "path": "webpage",
        "select": ["webpage", "webpageUrl"]
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

export const columns = [
  {
    label: "ID",
    field: "id",
    sort: "asc",
    width: 150,
  },
  {
    label: "Date",
    field: "date",
    sort: "asc",
    width: 150,
  },
  {
    label: "Off Page Activity Type",
    field: "offPageActivity",
    sort: "asc",
    width: 200,
  },
  {
    label: "Web Page",
    field: "webpage",
    sort: "disabled",
    width: 150,
  },

  {
    label: "Web Page",
    field: "webpage_search",
    sort: "disabled",
    width: 150,
  },

  {
    label: "Domain",
    field: "domain",
    sort: "asc",
    width: 150,
  },

  {
    label: "Domain",
    field: "domain_search",
    sort: "asc",
    width: 150,
  },

  {
    label: "Direct URL",
    field: "directUrl",
    sort: "asc",
    width: 270,
  },

  {
    label: "Direct URL",
    field: "directUrl_search",
    sort: "asc",
    width: 270,
  },

  {
    label: "Action",
    field: "action",
    width: 250,
    sort: "disabled",
  },

];