import { FromWho } from "../constants/chat";
export const setChatMessageModel = (json: {
  answer: string;
  image: string;
}) => ({
  text: json["answer"] == "yes" ? "Si 💕" : "No 😡",
  fromWho: FromWho.Hers,
  imageUrl: json["image"],
});
