import axios from 'axios';
import logger from './logger'

export const getCompanyInfo = async (businessId: string) => {
  try {
    const companyInfoRes = await axios.get(`https://www.kauppalehti.fi/company-api/basic-info/${businessId}`)

    logger.info("companyInfoRes.data", companyInfoRes.data)
    if (companyInfoRes.data) {
      return { success: true, data: companyInfoRes.data }
    }
    return { success: false, message: `Something went wrong when tring to get the info of the campany with business id ${businessId}.` }
  } catch (error: any) {
    logger.error(error)
    return { success: false, message: error.response.error }
  }
}