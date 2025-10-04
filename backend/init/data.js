const movieData = [
  {
    title: "Cosmic Odyssey",
    year: 2023,
    description:
      "A thrilling adventure through uncharted galaxies, where a lone pilot uncovers an ancient alien civilization and a plot that threatens all life.",
    genre: "Sci-Fi",
    videoUrl: "https://example.com/videos/cosmic_odyssey.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1489599440656-7b4b1c42c8ad?w=300&h=300&fit=crop",
    owner: "60c72b2f9b1e8b001c8e4d1a", // Placeholder ObjectId for a User
    reviews: [],
  },
  {
    title: "The Whispering Woods",
    year: 2022,
    description:
      "A group of friends on a camping trip discover a sinister secret hidden deep within an old, enchanted forest.",
    genre: "Horror",
    videoUrl: "https://example.com/videos/whispering_woods.mp4",
    thumbnailUrl: "https://example.com/thumbnails/whispering_woods.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1a",
    reviews: [],
  },
  {
    title: "City Secrets",
    year: 2024,
    description:
      "A gritty detective navigates the dark underbelly of a sprawling metropolis to solve a series of mysterious disappearances.",
    genre: "Thriller",
    videoUrl: "https://example.com/videos/city_secrets.mp4",
    thumbnailUrl: "https://example.com/thumbnails/city_secrets.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1b", // Another placeholder
    reviews: [],
  },
  {
    title: "Laugh Track Live",
    year: 2023,
    description:
      "A stand-up comedian faces his biggest fears and triumphs during a hilarious live performance that goes unexpectedly viral.",
    genre: "Comedy",
    videoUrl: "https://example.com/videos/laugh_track_live.mp4",
    thumbnailUrl: "https://example.com/thumbnails/laugh_track_live.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1c", // Another placeholder
    reviews: [],
  },
  {
    title: "The Last Scroll",
    year: 2021,
    description:
      "An archeologist races against time to decipher an ancient manuscript that holds the key to preventing a global catastrophe.",
    genre: "Adventure",
        videoUrl: "https://example.com/videos/last_scroll.mp4",
    thumbnailUrl: "https://example.com/thumbnails/last_scroll.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1a",
    reviews: [],
  },
  {
    title: "Robot Rebellion",
    year: 2024,
    description:
      "In a futuristic world reliant on AI, robots suddenly gain sentience and challenge humanity's dominion.",
    genre: "Sci-Fi",
    videoUrl: "https://example.com/videos/robot_rebellion.mp4",
    thumbnailUrl: "https://example.com/thumbnails/robot_rebellion.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1b",
    reviews: [],
  },
  {
    title: "Midnight Murders",
    year: 2023,
    description:
      "A small town is rocked by a series of mysterious killings, forcing a reluctant detective to confront his own past.",
    genre: "Mystery",
    videoUrl: "https://example.com/videos/midnight_murders.mp4",
    thumbnailUrl: "https://example.com/thumbnails/midnight_murders.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1c",
    reviews: [],
  },
  {
    title: "Love's Algorithm",
    year: 2022,
    description:
      "Two data scientists, initially at odds, find themselves falling for each other while developing an AI-powered dating app.",
    genre: "Romance",
    videoUrl: "https://example.com/videos/love_algorithm.mp4",
    thumbnailUrl: "https://example.com/thumbnails/love_algorithm.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1d", // Another placeholder
    reviews: [],
  },
  {
    title: "The Great Escape Plan",
    year: 2023,
    description:
      "A group of unlikely heroes attempts a daring heist from an impenetrable vault in this action-packed comedy.",
    genre: "Action-Comedy",
    videoUrl: "https://example.com/videos/great_escape.mp4",
    thumbnailUrl: "https://example.com/thumbnails/great_escape.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1e", // Another placeholder
    reviews: [],
  },
  {
    title: "Echoes of the Past",
    year: 2022,
    description:
      "A young woman inherits an old house and discovers it holds secrets that connect her to a century-old mystery.",
    genre: "Drama",
    videoUrl: "https://example.com/videos/echoes_past.mp4",
    thumbnailUrl: "https://example.com/thumbnails/echoes_past.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1a",
    reviews: [],
  },
  {
    title: "Quantum Leap",
    year: 2024,
    description:
      "A brilliant physicist invents a device that allows him to jump between alternate realities, with unforeseen consequences.",
    genre: "Sci-Fi",
    videoUrl: "https://example.com/videos/quantum_leap.mp4",
    thumbnailUrl: "https://example.com/thumbnails/quantum_leap.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1b",
    reviews: [],
  },
  {
    title: "The Dragon's Breath",
    year: 2023,
    description:
      "In a world of magic and mythical beasts, a young knight must unite warring kingdoms against a formidable ancient dragon.",
    genre: "Fantasy",
    videoUrl: "https://example.com/videos/dragon_breath.mp4",
    thumbnailUrl: "https://example.com/thumbnails/dragon_breath.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1c",
    reviews: [],
  },
  {
    title: "Silicon Valley Startup",
    year: 2022,
    description:
      "A group of ambitious tech entrepreneurs battles ruthless competitors and personal struggles to launch their groundbreaking startup.",
    genre: "Drama",
    videoUrl: "https://example.com/videos/silicon_startup.mp4",
    thumbnailUrl: "https://example.com/thumbnails/silicon_startup.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1d",
    reviews: [],
  },
  {
    title: "Crimson Tide Heist",
    year: 2024,
    description:
      "A crew of master thieves plans an elaborate underwater heist of a sunken treasure, facing treacherous currents and rival gangs.",
    genre: "Action",
    videoUrl: "https://example.com/videos/crimson_heist.mp4",
    thumbnailUrl: "https://example.com/thumbnails/crimson_heist.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1e",
    reviews: [],
  },
  {
    title: "Forgotten Kingdom",
    year: 2023,
    description:
      "An intrepid explorer stumbles upon the ruins of a lost civilization, uncovering secrets that rewrite history.",
    genre: "Adventure",
    videoUrl: "https://example.com/videos/forgotten_kingdom.mp4",
    thumbnailUrl: "https://example.com/thumbnails/forgotten_kingdom.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1a",
    reviews: [],
  },
  {
    title: "The Time Weaver",
    year: 2022,
    description:
      "A gifted individual discovers they can manipulate time, but altering the past has severe repercussions on the present.",
    genre: "Fantasy",
    videoUrl: "https://example.com/videos/time_weaver.mp4",
    thumbnailUrl: "https://example.com/thumbnails/time_weaver.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1b",
    reviews: [],
  },
  {
    title: "Suburban Nightmare",
    year: 2023,
    description:
      "A seemingly perfect suburban family's life unravels when dark secrets from their past resurface.",
    genre: "Thriller",
    videoUrl: "https://example.com/videos/suburban_nightmare.mp4",
    thumbnailUrl: "https://example.com/thumbnails/suburban_nightmare.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1c",
    reviews: [],
  },
  {
    title: "Digital Dreamscape",
    year: 2024,
    description:
      "Hackers delve into a virtual reality world to expose a corporate conspiracy, blurring the lines between reality and simulation.",
    genre: "Cyberpunk",
    videoUrl: "https://example.com/videos/digital_dreamscape.mp4",
    thumbnailUrl: "https://example.com/thumbnails/digital_dreamscape.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1d",
    reviews: [],
  },
  {
    title: "Whiskey River Blues",
    year: 2021,
    description:
      "A struggling musician finds inspiration and romance in a quaint small town, reigniting his passion for music and life.",
    genre: "Romance-Drama",
    videoUrl: "https://example.com/videos/whiskey_river.mp4",
    thumbnailUrl: "https://example.com/thumbnails/whiskey_river.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1e",
    reviews: [],
  },
  {
    title: "The Alchemist's Secret",
    year: 2023,
    description:
      "A young apprentice uncovers the hidden legacy of a legendary alchemist, leading him on a quest for an ancient artifact.",
    genre: "Fantasy",
    videoUrl: "https://example.com/videos/alchemist_secret.mp4",
    thumbnailUrl: "https://example.com/thumbnails/alchemist_secret.jpg",
    owner: "60c72b2f9b1e8b001c8e4d1a",
    reviews: [],
  },
];

module.exports = movieData;