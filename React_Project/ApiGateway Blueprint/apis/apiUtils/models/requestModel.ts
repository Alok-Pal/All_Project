export class requestModel {
  public url!: string;
  public method!: string;
  public params!: any;
  public data!: string | any;
  public headers!: any;
  public timeout!: number;
  public withCredentials!: boolean;
  public auth!: { username: string; password: string };
  public responseType!: string;
  public responseEncoding!: string;
  public xsrfCookieName!: string;
  public xsrfHeaderName!: string;
  public maxContentLength!: number;
  public maxBodyLength!: number;
  public proxy!: {
    protocol: string;
    host: string;
    port: number;
    auth: {
      username: string;
      password: string;
    };
  };
}
