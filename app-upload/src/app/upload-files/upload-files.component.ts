import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {UploadService} from "../services/upload.service";


@Component({
    selector: 'upload-files',
    templateUrl: './upload-files.component.html',
    styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
    selectedFile: File = null;
    uploadPreview: string;
    uploadProgress = 0;
    isRunUpload = false;
    error: string;
    showError = false;
    showSuccess = false;

    constructor(private http: HttpClient, private uploadService: UploadService) {
    }

    ngOnInit() {
    }

    onFileSelected(event) {
        this.showSuccess = false;
        if (event.target.files && event.target.files[0]) {
            const fileSize = (event.target.files[0].size / 1024) / 1024;
            if (fileSize < 1) {
                this.selectedFile = <File>event.target.files[0];
                let reader = new FileReader();
                reader.onload = event => this.uploadPreview = reader.result;
                reader.readAsDataURL(this.selectedFile);
                this.clearError();
            } else {
                this.setError('Max file size 1MB');
                this.uploadPreview = null;
                this.selectedFile = null;
            }

        }
    }

    setError(message) {
        this.error = message;
        this.showError = true;
    }

    clearError() {
        this.error = '';
        this.showError = false;
    }

    onUpload() {
        const fd = new FormData();
        this.isRunUpload = true;
        fd.append('sampleFile', this.selectedFile, this.selectedFile.name);
        this.uploadFile(fd);
    }

    uploadFile(file) {
        this.uploadService.imgUpload(file)
            .subscribe((event: any) => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.uploadProgress = Math.round(event.loaded / event.total * 100);
                    console.log('Upload progress', Math.round(event.loaded / event.total * 100) + '%');
                } else if (event.type === HttpEventType.Response) {
                    if (event.body.status && event.body.response) {
                        console.log('Result', event);
                        this.selectedFile = null;
                        this.setSuccess();
                    } else {
                        this.selectedFile = null;
                        this.setError(event.body.response ? event.body.response : 'Connection Error');
                    }
                    this.clearProgress();

                }
            }, (err: HttpErrorResponse ) => {
                console.error('Server response error', err);
                this.setError(err.error.response ? err.error.response : 'Connection Error');
                this.selectedFile = null;
                this.clearProgress();
            });
    }

    setSuccess() {
       this.showSuccess = true;
    }

    clearProgress() {
        this.isRunUpload = false;
        this.uploadProgress = 0;
        this.uploadPreview = null;
    }


}
