import { useQuery } from 'react-query';
import { fetchDailyVideo, fetchWeeklyPDF } from '../services/api_data'; // Replace with your actual path

export const useProgramming = () => {
  // Query for fetching the daily video link
  const {
    data: dailyVideoData,
    isLoading: isDailyVideoLoading,
    isError: isDailyVideoError,
    error: dailyVideoError,
  } = useQuery('dailyVideo', fetchDailyVideo);

  // Query for fetching the weekly PDF link
  const {
    data: weeklyPDFData,
    isLoading: isWeeklyPDFLoading,
    isError: isWeeklyPDFError,
    error: weeklyPDFError,
  } = useQuery('weeklyPDF', fetchWeeklyPDF, {
    staleTime: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });
  
// Extract the video_link from dailyVideoData and pdf_link from weeklyPDFData
const dailyVideoLink = dailyVideoData?.video_link;
const weeklyPDFLink = weeklyPDFData?.pdf_link;

return {
  dailyVideoLink, // This now directly returns the video link string
  weeklyPDFLink,  // This now directly returns the PDF link string
  isLoading: isDailyVideoLoading || isWeeklyPDFLoading,
  isError: isDailyVideoError || isWeeklyPDFError,
  error: dailyVideoError || weeklyPDFError,
};
};

