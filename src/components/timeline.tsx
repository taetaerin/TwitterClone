import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../routes/firebase";
import Tweet from "./tweet"; // 파일 이름이 Tweet.tsx 여야 합니다.
import { styled } from "styled-components";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow: scroll;
`;

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubcribe : Unsubscribe | null = null;

    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc")
      );
  
      unsubcribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
              const { tweet, createdAt, userId, username, photo } = doc.data();
              return {
                tweet,
                createdAt,
                userId,
                username,
                photo,
                id: doc.id,
              };
        });
        setTweets(tweets);
      })
    };
    fetchTweets();
    return () => {
      unsubcribe && unsubcribe();
    }
  }, []);



  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
