export interface IReviewCard {
  id: number;
  review: string;
  author: string;
  authorImage: string;
  date: string;
  rating: number;
}

const authorImages = [
  "/profile/ai-person-1.jpeg",
  "/profile/ai-person-2.jpeg",
  "/profile/ai-person-3.jpeg",
  "/profile/ai-person-4.jpeg",
  "/profile/ai-person-5.jpeg",
  "/profile/ai-person-6.jpeg",
  "/profile/ai-person-7.jpeg",
  "/profile/ai-person-8.jpeg",
  "/profile/ai-person-9.jpeg",
];

export const reviews: IReviewCard[] = [
  {
    id: 1,
    review:
      "The consultancy guided me through the entire process of applying to universities in Canada. From choosing the right course to visa documentation, everything was explained clearly.",
    author: "Aarav Sharma",
    authorImage: authorImages[0],
    date: "2 months ago",
    rating: 5.0,
  },
  {
    id: 2,
    review:
      "Thanks to their expert counselling, I was able to secure admission to a university in Australia. The team helped me with my SOP, application, and visa process.",
    author: "Sophia Williams",
    authorImage: authorImages[1],
    date: "1 month ago",
    rating: 4.9,
  },
  {
    id: 3,
    review:
      "Their step-by-step guidance made the study abroad process much easier. I received my UK student visa smoothly with their support.",
    author: "Rahul Verma",
    authorImage: authorImages[2],
    date: "3 weeks ago",
    rating: 4.8,
  },
  {
    id: 4,
    review:
      "I was confused about which country and course to choose. The counsellors helped me find the perfect program in New Zealand that matches my career goals.",
    author: "Emily Johnson",
    authorImage: authorImages[3],
    date: "2 weeks ago",
    rating: 4.7,
  },
  {
    id: 5,
    review:
      "The team provided excellent support during my application process. Their guidance on documentation and visa interview preparation was extremely helpful.",
    author: "Daniel Kim",
    authorImage: authorImages[4],
    date: "1 week ago",
    rating: 5.0,
  },
  {
    id: 6,
    review:
      "From IELTS guidance to university applications, everything was handled professionally. I am now preparing to start my studies in the United States.",
    author: "Ananya Patel",
    authorImage: authorImages[5],
    date: "5 days ago",
    rating: 4.9,
  },
  {
    id: 7,
    review:
      "The consultants were very supportive and responsive. They helped me understand the visa requirements and complete my application without stress.",
    author: "Michael Brown",
    authorImage: authorImages[6],
    date: "3 days ago",
    rating: 4.8,
  },
  {
    id: 8,
    review:
      "I highly recommend their services for students planning to study abroad. Their advice on course selection and universities was very valuable.",
    author: "Olivia Taylor",
    authorImage: authorImages[7],
    date: "2 days ago",
    rating: 4.7,
  },
  {
    id: 9,
    review:
      "Their guidance helped me successfully secure admission and a visa for studying in Canada. The entire process was smooth and well-organized.",
    author: "David Lee",
    authorImage: authorImages[8],
    date: "1 day ago",
    rating: 5.0,
  },
  {
    id: 10,
    review:
      "A very professional consultancy team. They supported me throughout my study abroad journey and answered every question patiently.",
    author: "Sofia Martinez",
    authorImage: authorImages[9],
    date: "12 hours ago",
    rating: 4.9,
  },
];
