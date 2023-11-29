import axios from 'axios';

export const fetchRedirectLocation = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://dekacomp.us4.list-manage.com/track/click?u=723a26c4b593ffbf674f2f44b&id=e875cb3755&e=00cac42032',
    headers: { 
        'authority': 'dekacomp.us4.list-manage.com', 
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
    'accept-language': 'en-US,en;q=0.9', 
    'cookie': '_mcid=1.85d51ec1dc89fd506d5fe1a065daffdc.bbf64fa746961f874deb550afb102593685d34d315d63b225f94c84bda5fa0c2; _abck=D4629765AE496DDA97A323393634679A~-1~YAAQzmvcF3Q+uTiLAQAArqcHPgp7xWADA+Zb46UP7g2V/lx+u/1VLvmU3Q4hr1afXDwKSoqRzqfTqrKHjJzBw35PaufUGvBb2Q8nQsnTFeNXUZAXvSID/kd3d1Azm0x3eF+Gmd/DG3gFj2xEmJTVfUnu6KLaKsusbFZSXyZ2PQKbdcnrHcDicIJg/V/OD4SNsCjSCr0kOSlJ3x94WlqwtepzgZFbwXUTG9waM8lWE+kOY97IBUIduZGuz3Lo8Dh5SXgz2+wMZVwG8dL047jH/1sOsMXP3KrKkDUFZiMgXkSzxC53N4whnsBmDz3Fz5cg9att2zeYswX7qsSYfkTabXY85zv33MAgxW/Uw/ADvS9Ncz4VfI2AHAEh+CCtaLJBSDhp+DNegw90gCc9Qgxw~-1~-1~-1; ak_bmsc=F723CD54DE455B8C12EB6D1110CE50FD~000000000000000000000000000000~YAAQzmvcF3U+uTiLAQAArqcHPhXzXPmhCD2POc100AtmBSlAd91uKXLokVcTpuRFpFY4wSoUkk1kG9JozvjTRyZg75z4m8yVjTLRztrJQjwmtiVm+9zfQYtnNXz6bb92HFkL9z/dBLYap2tBQlFBt7v8r0OyDcRjjp8kz91qrDK/1AbrY1Hl9iRPLnmzbVQwKMXzexygD7BY15l15yuBFvb4UnSgWs+dLIWsCuQitY9s93yfNVUnPU4ID07M7OSfxr8/JvF6rsdZPbFFaEiLqTv7t3vXbIibiEPGHoSdyVuzj3x4PgOnC+4PjZDZWX5coMi6EtuL1ugxRxbrRtausDAWK068FhUP7QKQreAnw/y5lVd+Dpb1uxcx++GUruLmdPqkg+2LAmV37WQgnCMSueQM+GQ=; bm_sz=70E3B44A8416FB6E5AA79EE5CBA60812~YAAQzmvcF3Y+uTiLAQAArqcHPhXHTyeRXkY78VG8HpMu1RpGOPAo092UWnJNACB7LP29QLbVEoIuuz9bcM5Xpjjzyo9kyeSw+zpFY8hbj7IZqM2AY9xfsYG7OPSEG+nDdLTQLSI4nxYC+xm2eqkZjrB2xOpcJBkE001lugzIFCCSqHZkJQ7doa82IJ3jD3xQY4kE3MFAEGIVL1nEv3MsKTNpie3mS6J2cMoJFJ27hmxaj/ZAEjjzGW6bqFesjQn+3dL4t8GTF9SjsFVw9kiRaAOWLiIkaTlZvhcanZKvh8jo/91UZBNoQA==~4600370~4342068; bm_sv=0B39A749B26F73822199918B96D5307A~YAAQzmvcF054uziLAQAA6msPPhUlLscUEX+LBw7lJNmcZK5zx/GdE5/2goiWRvfIM+2DoZKgaGQKTVzQib9OBzZ/nAaTZkd/rw4aEAcfDBeNQCLZYm0MUOWDuSMqFX5vHIKSmqNeQNi9aFrJKWqQaMdRKu+NwwBih2nYWs9H60Jou7GpcNrjskHOAITq1DPJYxm3I6+tWueV6pNldxtgePxEzvSAHMvCA0hBsXOfLZJO8lHWXUppl9xYahdfqhI6UsrgFvwNEdOi~1; bm_sv=0B39A749B26F73822199918B96D5307A~YAAQlGrcF+K0DjiLAQAA0rkxPhXP0g05XigfYr4pxFiFioNR6e5p0iEKCVO02MxiJFsxWE/cwIB16Vk5j5mwWYkrDxhbz8OfMWGJ5hkK/k1raPuB2IcgSFCmTHkxQCCqq+uOUesLUjRy8Yn+k9A/AITWRTpgVdr7UZasyutl14DXhWtis+IAaFkH48Z+FbWRZyf+y7xIT1Nwm0NUdfQibma9qs1riR9IBkkfXQk6odxgYmAhwozOoUNAYQMuWX3M0yIsAZOe5gj4~1; _mcid=1.85d51ec1dc89fd506d5fe1a065daffdc.bbf64fa746961f874deb550afb102593685d34d315d63b225f94c84bda5fa0c2', 
    'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-platform': '"Windows"', 
    'sec-fetch-dest': 'document', 
    'sec-fetch-mode': 'navigate', 
    'sec-fetch-site': 'none', 
    'sec-fetch-user': '?1', 
    'upgrade-insecure-requests': '1', 
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
      }
  };

  try {
    const response = await axios.request(config);
    const data = response.data;

    // Using DOM Parser to extract the URL
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const link = doc.querySelector('link[rel="shortlinkUrl"]');
    if (link) {
        console.log('youtube link found')
        console.log(link.getAttribute('href'))
      return link.getAttribute('href'); // Return the URL in the href attribute
    }

  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }

  return null; // Return null if unable to find the tag
};
