export const permissionCheck = (permissionObject: any, permissionConst: any) => {
    if (permissionObject != null) {
        console.log("🚀 ~ file: permissionCheck.ts:3 ~ permissionCheck ~ permissionObject:", permissionObject)

        console.log("🚀 ~ file: permissionCheck.ts:6 ~ permissionCheck ~ permissionObject[0].role.permission.some( (per:any) => per.permission_name === permissionConst):", permissionObject[0].role.permission.some((per: any) => per.permissionName === permissionConst))


        return permissionObject[0].role.permission.some((per: any) => per.permissionName === permissionConst);
    }
    else {
        return false;
    }

}

