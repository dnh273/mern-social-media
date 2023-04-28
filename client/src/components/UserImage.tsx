import { Avatar, Box } from "@mui/material";
import { DOMAIN } from "../utils/setting/config";

interface UserImageProps {
  image?: string;
  size?: string;
}

const UserImage = ({ image, size = "60px" }: UserImageProps) => {
  if (!image) {
    return <Avatar sx={{ height: "60px", width: "60px" }} />;
  } else {
    return (
      <Box width={size} height={size}>
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`${DOMAIN}/assets/${image}`}
        />
      </Box>
    );
  }
};

export default UserImage;
