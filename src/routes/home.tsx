import { styled } from "styled-components"
import PostTweetFrom from "../components/post-tweet-form"
import Timeline from "../components/timeline";

const Wrapper = styled.div`

`;

export default function Home() {
    return (
        <Wrapper>
            <PostTweetFrom />
            <Timeline />
        </Wrapper>
    )
}