import * as React from 'react';
import { FileUploaderRegular, OutputCollectionState, OutputCollectionStatus, OutputFileEntry, UploadCtxProvider } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { FileEntry } from '@/types';

interface IFileUploaderProps {
  fileEntry: FileEntry,
  onChange: (FileEntry: FileEntry) => void,
  preview: boolean
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({fileEntry, onChange,preview}) => {
  const [uploadedFiles, setUploadedFiles] = React.useState<OutputFileEntry<'success'>[]>([]);
  const ctxProviderRef = React.useRef<InstanceType<UploadCtxProvider>>(null);

  const uploadCarePublicKey = import.meta.env.VITE_UPLOAD_CARE_KEY

  

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
      ...fileEntry, 
      files: [...fileEntry.files, ...uploadedFiles] 
    });
  
    setUploadedFiles([]);
  };


  const handleChangeEvent = (event: OutputCollectionState<OutputCollectionStatus>) => {
    setUploadedFiles(event.successEntries);
  };
  
  return   <div>
  <FileUploaderRegular
         sourceList="local, camera, facebook, gdrive"
         cameraModes="photo, video"
         classNameUploader="uc-light"
         pubkey={uploadCarePublicKey}
         apiRef={ctxProviderRef}
         imgOnly
         multiple={preview}
         removeCopyright
         confirmUpload={false}
         onChange={handleChangeEvent}
         onModalClose={handleModalCloseEvent}
      />
      {preview &&
            <div className={"flex justify-start gap-2 mt-5"}>
        {fileEntry.files.map((file) => (
          <div key={file.uuid} className={"relative"}>
            <img
              className={"w-40 aspect-video h-40"}
              key={file.uuid}
              src={`${file.cdnUrl}/-/preview/-/resize/x200/`}
              width="100"
              alt={file.fileInfo?.originalFilename ?? ''}
              title={file.fileInfo?.originalFilename ?? ''}
            />
              <button
                className="absolute top-0 right-0 z-20 bg-white px-2 py-0 rounded-full overflow-hidden"
                type="button"
                onClick={() => {
                  if (file.fileInfo?.uuid) {
                    handleRemoveClick(file.fileInfo.uuid);
                  }
                }}
              >
                ×
              </button>
          </div>
        ))}
      </div>}
</div>
};

export default FileUploader;
