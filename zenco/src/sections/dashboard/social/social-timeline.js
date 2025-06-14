import { Unstable_Grid2 as Grid, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { SocialAbout } from "./social-about";
import { SocialPostAdd } from "./social-post-add";
import { SocialPostCard } from "./social-post-card";

export const SocialTimeline = (props) => {
  const { posts = [], profile, ...other } = props;

  return (
    <div {...other}>
      <Grid container spacing={4}>
        <Grid lg={4} xs={12}>
          <SocialAbout
            currentCity={profile.currentCity}
            currentJobCompany={profile.currentJobCompany}
            currentJobTitle={profile.currentJobTitle}
            email={profile.email}
            originCity={profile.originCity}
            previousJobCompany={profile.previousJobCompany}
            previousJobTitle={profile.previousJobTitle}
            profileProgress={profile.profileProgress}
            quote={profile.quote}
          />
        </Grid>
        <Grid lg={8} xs={12}>
          <Stack spacing={3}>
            <SocialPostAdd />
            {posts?.map((post) => (
              <SocialPostCard
                key={post.id}
                authorAvatar={post.author.avatar}
                authorName={post.author.name}
                comments={post.comments}
                createdAt={post.createdAt}
                isLiked={post.isLiked}
                likes={post.likes}
                media={post.media}
                message={post.message}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

SocialTimeline.propTypes = {
  posts: PropTypes.array,
  // @ts-ignore
  profile: PropTypes.object.isRequired,
};
