export interface CamerasWrapper {
  cameras: CameraDto[];
}

export interface CameraDto {
  id: string;
  name: string;
  primaryStream: CameraPrimaryStreamDto;
}

export interface CameraPrimaryStreamDto {
  id: string;
}
