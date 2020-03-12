import { requestServices } from 'services';
import * as constants from 'constants/index'


const analyzeQuery = (accessToken, data) => requestServices.customAxios.post(
    constants.analysis_analyze_query,
    data,
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    }
)

export default {
    analyzeQuery
}