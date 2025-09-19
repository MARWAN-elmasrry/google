import api from "../axois";

export const search = async(searchValue) =>{
    
    try {
            let data = JSON.stringify({
                "q": searchValue
            });
        const response = api.post("/search" , data )
        return response;
        } catch (error) {
          throw error?.response?.data || error.message || "خطأ";
        }
}

export const searchImg = async(searchValue) =>{
    
    try {
            let data = JSON.stringify({
                "q": searchValue,
                "num": 100
            });
        const response = api.post("/images" , data )
        return response;
        } catch (error) {
          throw error?.response?.data || error.message || "خطأ";
        }
}