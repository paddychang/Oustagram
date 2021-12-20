import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// Assets

export default function ProfileImageList({ posts }) {
  return (
    <ImageList
      sx={{ width: 1150, height: "auto", mt: 5 }}
      cols={3}
      rowHeight={300}
      gap={10}
    >
      {posts.map((item) => (
        <ImageListItem key={item.imageUrl}>
          <img
            src={item.imageUrl}
            alt="Images Grid"
            loading="lazy"
            style={{ objectFit: "cover", height: 300 }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
