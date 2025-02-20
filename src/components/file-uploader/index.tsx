import * as React from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

interface IFileUploaderProps {
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = (props) => {
  return   <div>
  {/* <lr-config
    ctx-name="my-uploader"
    pubkey="74e63f3a7042561655f6"
    multiple={true}
    confirmUpload={false}
    removeCopyright={true}
    imgOnly={true}
  ></lr-config> */}

  {/* <lr-file-uploader-regular
    ctx-name="my-uploader"
    css-src={blocksStyles}
  ></lr-file-uploader-regular> */}

  {/* <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} /> */}

  <FileUploaderRegular
         sourceList="local, camera, facebook, gdrive"
         cameraModes="photo, video"
         classNameUploader="uc-light"
         pubkey="b86432f00257d8a4b487"
      />
</div>
};

export default FileUploader;
