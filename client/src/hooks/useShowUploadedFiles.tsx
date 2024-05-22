import { Typography } from '@mui/material';

const useShowUploadedFiles = (uploadedFiles: File | FileList | undefined) =>
  function showFiles() {
    let fileName = '';
    if (uploadedFiles) {
      Array.prototype.map.call(uploadedFiles, (file) => {
        fileName = file.name;
      });
    }

    return fileName ? (
      <Typography variant="h6" component="p">
        {fileName && `Image: ${fileName}`}
      </Typography>
    ) : undefined;
  };

export default useShowUploadedFiles;
