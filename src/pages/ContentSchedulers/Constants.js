export const payload =  {
  "options": {
    "populate": [
      {
        "path": "webpage",
        "select": ["webpage","webpageUrl"]
      },
      {
        "path": "assignedBy",
        "select": ["name", "avatar"]
      },
      {
        "path": "writtenBy",
        "select": ["name", "avatar"]
      }
    ]
  }
}

export const columns = [
    {
      label: "ID",
      field: "id",
      sort: "asc",
      width: 10,
    },
    {
      label: "Content Type",
      field: "content_type",
      sort: "asc",
      width: 50,
    },
    {
      label: "Web Page",
      field: "web_page",
      sort: "disabled",
      width: 200,
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
      label: "Topic Title",
      field: "topic_title",
      sort: "disabled",
      width: 200,
    },

    // {
    //   label: "Doc Link",
    //   field: "doc_link",
    //   sort: "asc",
    //   width: 100,
    // },
    // {
    //   label: "Referece Links",
    //   field: "referece_links",
    //   sort: "asc",
    //   width: 100,
    // },
    {
      label: "Expected Words",
      field: "expected_words",
      sort: "asc",
      width: 10,
    },
    {
      label: "Actual Words",
      field: "actual_words",
      sort: "asc",
      width: 10,
    },
    {
      label: "Assigned On",
      field: "assigned_on",
      sort: "asc",
      width: 100,
    },

    {
      label: "Assigned By",
      field: "assigned_by",
      sort: "asc",
      width: 50,
    },

    {
      label: "To Be Submitted On",
      field: "submiited_on",
      sort: "asc",
      width: 100,
    },
    {
      label: "Written By",
      field: "written_by",
      sort: "asc",
      width: 50,
    },
    {
      label: "Content Status",
      field: "content_status",
      sort: "disabled",
      width: 100,
    },
    {
      label: "Action",
      field: "action",
      width: 50,
      sort: "disabled",
    },

  ];

