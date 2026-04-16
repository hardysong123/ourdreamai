export interface Character {
  id: string;
  name: string;
  age: number;
  description: string;
  fullDescription: string;
  image: string;
  likes: string;
  views: string;
  author: {
    name: string;
    avatar: string;
    interactions: string;
    followers: string;
  };
  tags: string[];
}

export interface FilterState {
  search: string;
  sort: string;
  gender: string;
  style: string;
  age: string;
  tags: string[];
}
