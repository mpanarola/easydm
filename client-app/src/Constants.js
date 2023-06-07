export const isArrayEquals = (a, b) => {
	return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
};


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



  // Type
export const optionGroupType = [
    {
      label: "Type",
      options: [
        { label: "Blog", value: "Blog"  },
        { label: "Article", value: "Article" },
        { label: "eBook", value: "eBook" },
        { label: "Infographics", value: "Infographics" },
        { label: "PPT", value: "PPT" },
        { label: "PPC", value: "PPC" },
      ],
    },
  
  ];

  // Status
export const optionGroupStaus = [
    {
      label: "Status",
      options: [
        { label: "In Progress", value: "In-progress" },
        { label: "Complete", value: "Complete" },
        { label: "Input missing", value: "Input-missing" },
        { label: "In review", value: "In-review" },
      ],

    },
  
  ];





  export const optionMemberType = [
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
  export const optionMemberStaus = [
    {
      label: "Type",
      options: [
        { label: "Active", value: true },
        { label: "InActive", value: false },
      ],
    },
   
  ];


    // BackLink Status
    export const optionBackLinkStaus = [
      {
        label: "Status",
        options: [
          { label: "In Review", value: "In Review" },
          { label: "Done", value: "Done" },
          { label: "Rejected", value: "Rejected" },

        ],
      },
     
    ];



    // offPageActivityType
export const offPageActivityType = [
  {
    label: "Type",
    options: [
      { label: "Social Bookmarking", value: "Social Bookmarking"  },
      { label: "Classified", value: "Classified" },
      { label: "Directory", value: "Directory" },
      { label: "Blog Submission", value: "Blog Submission" },
      { label: "Guest Posting", value: "Guest Posting" },
      { label: "Profile Creation", value: "Profile Creation" },
      { label: "Business Listing", value: "Business Listing" },
      { label: "Visual Submission", value: "Visual Submission" },
      { label: "Q&A", value: "Q&A" },
    ],
  },

];