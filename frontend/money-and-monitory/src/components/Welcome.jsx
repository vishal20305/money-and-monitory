import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import image1 from "../assets/card1.png";
import image2 from "../assets/card2.png";
import image3 from "../assets/card3.png";

const Welcome = () => {
  return (
    <>
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 415, backgroundColor: "#d6c9e1" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="230"
                  width="415"
                  image={image1}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    Feel the confidence to plan big
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Whether it's discovering ways to make your money grow, or
                    planning your next new goal, your Premier Manager is here to
                    help you take your money to the next level so that it serves
                    the needs of you and your family.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 415, backgroundColor: "#d6c9e1" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="230"
                  width="415"
                  image={image2}
                  alt="alt image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    Stay safe, secure and supported
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Our friendly Premier 24 team are all human, without a bot in
                    sight, and our voice recognition technology means talking to
                    them about your day-to-day needs is even more secure. Call
                    any day, any time. They're always here to help. Voice ID is
                    available to Telephone Banking customers aged 18 and over.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 415, backgroundColor: "#d6c9e1" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="230"
                  width="415"
                  image={image3}
                  alt="alt image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    Make your money work harder
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    You could secure preferential product rates, increased
                    payment limits and no-fees spend abroad. Plus, we could
                    connect you with a network of NatWest specialists who could
                    help you take your wealth even further. A fee may apply for
                    this service.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Welcome;
