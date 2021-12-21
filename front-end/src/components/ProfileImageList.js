import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function ProfileImageList({ post }) {
  return (
    <ImageListItem key={post.imageUrl}>
      <img
        src={post.imageUrl}
        alt="Images Grid"
        loading="lazy"
        style={{ objectFit: "cover", height: 300 }}
      />
    </ImageListItem>
  );
}
