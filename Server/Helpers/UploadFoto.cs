using Microsoft.AspNetCore.Http.HttpResults;
using server.Dto;

namespace server.Helpers
{
    public class UploadFoto
    {
        public static async Task<string> FotoUpload(IFormFile uploadFoto)
        {
            string[] allowedExtensions = { ".jpg", ".png", ".jpeg" };
            string fileExtension = Path.GetExtension(uploadFoto.FileName);

            if (!allowedExtensions.Contains(fileExtension.ToLower()))
                return "Invalid file format. Allowed formats: .jpg, .png, .jpeg";

            if (uploadFoto.Length > 15 * 1024 * 1024)
                return "Batas Ukuran File 15 MB.";

            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot","Uploads");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string fileName = Guid.NewGuid().ToString() + fileExtension;
            string filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await uploadFoto.CopyToAsync(stream);
            }

            return fileName;
        }
    }
}
