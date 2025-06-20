// type User = {
//   name: string;
//   email: string;
//   image?: string;
//   accountId: string;
// };

enum Country {
  american = "american",
  australian = "australian",
  japan = "japan",
  india = "india",
  russian = "russian",
  poland = "poland",
  canada = "canada",
  france = "france",
  china = "china",
  korean = "korean",
}

type Companion = Models.DocumentList<Models.Document> & {
  $id: string;
  name: string;
  country: Country;
  topic: string;
  duration: number;
  bookmarked: boolean;
};

interface CreateCompanion {
  name: string;
  country: string;
  topic: string;
  voice: string;
  style: string;
  duration: number;
}

interface GetAllCompanions {
  limit?: number;
  page?: number;
  country?: string | string[];
  topic?: string | string[];
}

interface BuildClient {
  key?: string;
  sessionToken?: string;
}

interface CreateUser {
  email: string;
  name: string;
  image?: string;
  accountId: string;
}

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Avatar {
  userName: string;
  width: number;
  height: number;
  className?: string;
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface CompanionComponentProps {
  companionId: string;
  country: string;
  topic: string;
  name: string;
  userName: string;
  userImage: string;
  voice: string;
  style: string;
}
