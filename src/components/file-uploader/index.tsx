import * as React from 'react';
import { FileUploaderRegular, OutputFileEntry, UploadCtxProvider } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
// import st from './FileUploader.module.scss';
import { FileEntry } from '@/types';

interface IFileUploaderProps {
  fileEntry: FileEntry,
  onChange: (FileEntry: FileEntry) => void
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({fileEntry, onChange}) => {
  const [uploadedFiles, setUploadedFiles] = React.useState<OutputFileEntry<'success'>[]>([]);
  const ctxProviderRef = React.useRef<InstanceType<UploadCtxProvider>>(null);

  const uploadCarePublicKey = import.meta.env.VITE_UPLOAD_CARE_KEY

  // console.log({uploadedFiles});
  

  const handleRemoveClick = React.useCallback((uuid: OutputFileEntry['uuid']) => {
    console.log({uuid});
    
    return onChange({
      ...fileEntry,
      files: fileEntry.files.filter(f => f.uuid !== uuid)})
  },
    [fileEntry, onChange]);

    console.log({fileEntry});
    

  const resetUploaderState = () => ctxProviderRef.current?.uploadCollection.clearAll();

  const handleModalCloseEvent = () => {
    resetUploaderState();
  
    onChange({
      ...fileEntry, // Keep existing properties
      files: [...fileEntry.files, ...uploadedFiles] // Ensure 'files' is present
    });
  
    setUploadedFiles([]);
  };


  const handleChangeEvent = (files) => {
    setUploadedFiles([...files.allEntries.filter(f => f.status === 'success')] as OutputFileEntry<'success'>[]);
  }
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
         pubkey={uploadCarePublicKey}
         apiRef={ctxProviderRef}
         imgOnly
         multiple
         removeCopyright
         confirmUpload={false}
         onChange={handleChangeEvent}
         onModalClose={handleModalCloseEvent}
      />
            <div className={"flex justify-start gap-2 mt-5"}>
        {fileEntry.files.map((file) => (
          <div key={file.uuid} className={"relative"}>
            <img
              className={"w-40 aspect-video h-40"}
              key={file.uuid}
              src={`${file.cdnUrl}/-/preview/-/resize/x200/`}
              width="100"
              alt={file.fileInfo?.originalFilename || ''}
              title={file.fileInfo?.originalFilename || ''}
            />

            <button
              className={"absolute top-0 right-0 z-20 bg-white px-2 py-0 rounded-full overflow-hidden"}
              type="button"
              onClick={() => handleRemoveClick(file.fileInfo.uuid)}
            >×
            </button>
          </div>
        ))}
      </div>
</div>
};

export default FileUploader;
