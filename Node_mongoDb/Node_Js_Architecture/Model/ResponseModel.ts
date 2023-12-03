class responseModel {
    //non-null assertion operator (!) => do not use it, =>  it essentially tells the compiler to ignore any potential null values that may exist at runtime
    // null coalescing operators (?:) => to handle null values in a safer way.
    
    public status?: number;
    public data: any;
    public message?: string;

    // or we can ue the  (number | undefined )

    // responsible()
}
export default responseModel;