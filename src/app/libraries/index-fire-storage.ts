// import { NgxImageCompressService } from 'ngx-image-compress'
// import {
//   Storage,
//   ref,
//   getStorage,
//   uploadBytes,
//   getDownloadURL,
//   deleteObject,
// } from '@angular/fire/storage'
// import { Firestore } from '@angular/fire/firestore'
import { isPlatformBrowser } from '@angular/common';

export class TitanqUtilsFireStorage {
  //   private static imageCompress: NgxImageCompressService
  //   public static uploadFileFireBase(
  //     storage: any,
  //     config: ConfigUpload,
  //     isImage: boolean,
  //     file: any,
  //     compress: boolean,
  //   ): void {
  //     if (isImage) {
  //       if (compress) {
  //         TitanqUtilsFireStorage.compressAndUploadFile(
  //           storage,
  //           this.imageCompress,
  //           config,
  //         )
  //       } else {
  //         this.uploadFileFirebase(config, file)
  //       }
  //     }
  //   }
  //   public static compressAndUploadFile(
  //     storage: any,
  //     imageCompress: NgxImageCompressService,
  //     config: any,
  //   ): void {
  //     try {
  //       //   this.globalService.showProgres();
  //       // tslint:disable-next-line: no-shadowed-variable
  //       imageCompress.uploadFile().then(
  //         ({ image, orientation }: any) => {
  //           // this.globalService.alertTitan.getMessage('loading', 'Subiendo imagen', 'Espere por favor, estamos subiendo la imagen...', null, null, null, null);
  //           // this.imgResultBeforeCompress = image; // imageBase64
  //           // console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
  //           // console.log('1');
  //           // console.log(image);
  //           imageCompress.compressFile(image, orientation, 50, 90).then(
  //             (result: any) => {
  //               // this.imgResultAfterCompress = result; // imageBase64
  //               // console.warn('Size in bytes is now:', imageCompress.byteCount(result));
  //               // console.log('2');
  //               // console.log(result);
  //               const fileToUpload = TitanqUtilsFireStorage.dataURLtoFile(
  //                 result,
  //                 'file' + config.code,
  //               )
  //               // this.fileToUpload = new File([result], 'nav360img' + this.contImageUpload, {
  //               //   type: 'image/jpeg',
  //               // });
  //               TitanqUtilsFireStorage.uploadFileFirebase(
  //                 // storage,
  //                 config,
  //                 fileToUpload,
  //               ).then(
  //                 (photoURL) => {
  //                   // const urlImage = 'https://firebasestorage.googleapis.com/v0/b/' +
  //                   //     photoURL.bucket + '/o/' + encodeURIComponent(photoURL.fullPath) + '?alt=media';
  //                   const urlImage =
  //                     'https://firebasestorage.googleapis.com/v0/b/' +
  //                     photoURL.bucket +
  //                     '/o/' +
  //                     encodeURIComponent(photoURL.fullPath)
  //                 },
  //                 (error) => {},
  //               )
  //             },
  //             (error: any) => {},
  //           )
  //         },
  //         (error: any) => {},
  //       )
  //     } catch (error) {}
  //   }
  //   // private static dataURLtoFile(dataurl: string, filename:string): File {
  //   private static dataURLtoFile(dataurl: string, filename: string): any {
  //     // tslint:disable-next-line: prefer-const
  //     try {
  //       let arr = []
  //       arr = dataurl.split(',')
  //       let firstText = arr[0] ? arr[0] : ''
  //       let mime = firstText.match(/:(.*?);/)?.[1],
  //         bstr = atob(arr[1]),
  //         n = bstr.length,
  //         u8arr = new Uint8Array(n)
  //       while (n--) {
  //         u8arr[n] = bstr.charCodeAt(n)
  //       }
  //       return new File([u8arr], filename, { type: mime })
  //     } catch (error) {}
  //   }
  //   // tslint:disable-next-line: typedef
  //   public static uploadFileFirebase(
  //     // storage: Storage,
  //     config: ConfigUpload,
  //     file: any,
  //   ): Promise<any> {
  //     return new Promise<any>((resolve, reject) => {
  //       // const d = config.directory + '/';
  //       //  this.currentCode = new Date().getTime();
  //       // const imageName = config.nameFile + '.' + config.ext;
  //       // const imageName = config.nameFile;
  //       const storage = getStorage()
  //       const storageRef = ref(storage, config.directory)
  //       uploadBytes(storageRef, file).then((snapshot) => {
  //         console.log('Uploaded a blob or file!')
  //         resolve(snapshot.metadata);
  //       })
  //       // const storageRef = storage.ref(d + config.nameFile);
  //       // const imageRef = storageRef.child(d).child(config.nameFile);
  //       // image.fullPath = directory + '/' + imageName;
  //       // storageRef.put(file).then(
  //       //   (snapshot: any) => {
  //       //     resolve(snapshot.metadata);
  //       //   },
  //       //   (err: any) => {
  //       //     reject(err);
  //       //   }
  //       // );
  //     })
  //   }
  //   public static downloadFile(
  //     // storage: Storage,
  //     path: string,
  //     // nameFile: string,
  //   ): Promise<any> {
  //     return new Promise<any>((resolve, reject) => {
  //       const storage = getStorage();
  //       getDownloadURL(ref(storage, path))
  //         .then((url) => {
  //           // `url` is the download URL for 'images/stars.jpg'
  //           // This can be downloaded directly:
  //           const xhr = new XMLHttpRequest()
  //           xhr.responseType = 'blob'
  //           xhr.onload = (event) => {
  //             const blob = xhr.response
  //           }
  //           xhr.open('GET', url)
  //           xhr.send()
  //           // Or inserted into an <img> element
  //     if (isPlatformBrowser(this.platformId)) {
  //         const img = document.getElementById('myimg')
  //           img?.setAttribute('src', url)
  // }
  //         })
  //         .catch((error: any) => {
  //           switch (error.code) {
  //             case 'storage/object-not-found':
  //               // File doesn't exist
  //               break;
  //             case 'storage/unauthorized':
  //               // User doesn't have permission to access the object
  //               break;
  //             case 'storage/canceled':
  //               // User canceled the upload
  //               break;
  //             case 'storage/unknown':
  //               // Unknown error occurred, inspect the server response
  //               break;
  //           }
  //         })
  //     })
  //   }
  //   public static getFileUrl(
  //     // storage: Storage,
  //     path: string,
  //     nameFile: string,
  //   ): Promise<any> {
  //     return new Promise<any>((resolve, reject) => {
  //       path = path.replace(/%2F/gi, '/')
  //       // ?alt=media
  //       // const storageRef = storage.ref(path2);
  //       // storageRef.getDownloadURL()
  //       // path = path.replace(/%2F/gi, '/');
  //       const storage = getStorage()
  //       // Create a storage reference from our storage service
  //       const storageRef = ref(storage, path)
  //       console.log(storageRef)
  //       // const storageRef = storage.storage.refFromURL(path);
  //       // storageRef.getDownloadURL
  //       getDownloadURL(storageRef)
  //         .then((url) => {
  //           resolve(url)
  //         })
  //         .catch((error: any) => {
  //           // Handle any errors
  //           reject(error)
  //         })
  //       // storageRef
  //       //   .getDownloadURL()
  //       //   .then((url: any) => {
  //       //     // `url` is the download URL for 'images/stars.jpg'
  //       //     resolve(url);
  //       //     // Or inserted into an <img> element:
  //       //     // var img = document.getElementById('myimg');
  //       //     // img.src = url;
  //       //   })
  //       //   .catch((error: any) => {
  //       //     // Handle any errors
  //       //     reject(error);
  //       //   });
  //     })
  //   }
  //   // public static deleteListFile(storage: Storage, listFile: IFile[]): boolean {
  //   public static deleteListFile(listFile: IFile[]): boolean {
  //     try {
  //       listFile.forEach((element) => {
  //         const urlParse = element.url.replace(/%2F/gi, '/')
  //         const storage = getStorage()
  //         // const storageRef = storage.storage.refFromURL(urlParse);
  //         // storageRef.delete();
  //         // Create a reference to the file to delete
  //         const desertRef = ref(storage, urlParse)
  //         // Delete the file
  //         deleteObject(desertRef)
  //           .then(() => {
  //             // File deleted successfully
  //           })
  //           .catch((error) => {
  //             // Uh-oh, an error occurred!
  //           })
  //       })
  //       return true
  //     } catch (error) {
  //       console.log(error)
  //       return false
  //     }
  //   }
  //   public static deleteFile( url: string): boolean {
  //     try {
  //       const urlParse = url.replace(/%2F/gi, '/')
  //       // const storageRef = storage.storage.refFromURL(urlParse);
  //       // storageRef.delete();
  //       const storage = getStorage()
  //       // Create a reference to the file to delete
  //       const desertRef = ref(storage, urlParse)
  //       // Delete the file
  //       deleteObject(desertRef)
  //         .then(() => {
  //           // File deleted successfully
  //         })
  //         .catch((error) => {
  //           // Uh-oh, an error occurred!
  //         })
  //       return true
  //     } catch (error) {
  //       console.log(error)
  //       return false
  //     }
  //   }
  //   public static getExtension(filename: string): any {
  //     return filename.split('.').pop()
  //   }
  //   public static getNameOutExtension(filename: string): string {
  //     filename.split('.').pop()
  //     return filename
  //   }
  //   public static getType(filename: string): string {
  //     let ext = filename.split('.').pop()
  //     ext = ext?.toLowerCase()
  //     switch (ext) {
  //       case 'png':
  //       case 'jpg':
  //       case 'jpeg':
  //       case 'svg':
  //         return 'image'
  //       case 'pdf':
  //         return 'pdf'
  //       case 'docx':
  //       case 'csv':
  //       case 'xlsx':
  //       case 'pptx':
  //       case 'doc':
  //       case 'xml':
  //         return 'office'
  //       case 'html':
  //       case 'txt':
  //         return 'html'
  //       default:
  //         return 'unknown'
  //     }
  //   }
}

export interface IFile {
  url: string;
  nameFile: string;
  ext: string;
}

export interface ConfigUpload {
  directory: string;
  nameFile: string;
  ext: string;
  code: string;
}
