export class Validate {
    static email(mail: string) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        }
        return false;
    }



    static Password = (val: string) => {
        return val.length >= 6;
    };

    static AddEventValidation = (data: any) => {
        const mess: string[] = [];
        // console.log(data)
        Object.keys(data).forEach(key => {
            if (key !== "description" && key !== "user") {
                !data[`${key}`] && mess.push(`${key} is required !!`)
            }

        })
        return mess
    }
}