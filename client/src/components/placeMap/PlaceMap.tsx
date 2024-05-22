import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { PlaceMapProps } from './PlaceMapProps';

function PlaceMap({ post, handleMapClose }: PlaceMapProps) {
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>
      <DialogTitle color="text.secondary">{post.title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleMapClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box sx={{ height: '17rem', width: '17rem' }}>
          <Map
            zoom={10}
            center={{
              lat: post.coordinates.lat,
              lng: post.coordinates.lng,
            }}
            gestureHandling="greedy"
            disableDefaultUI
          >
            <Marker
              position={{
                lat: post.coordinates.lat,
                lng: post.coordinates.lng,
              }}
            />
          </Map>
        </Box>
        <DialogContentText>{post.address}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          endIcon={<CloseIcon />}
          onClick={handleMapClose}
        >
          Close
        </Button>
      </DialogActions>
    </APIProvider>
  );
}

export default PlaceMap;
