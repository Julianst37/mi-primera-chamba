import { supabase } from "../supabase";

const uploadToVault = async (file: File, onProgress?: (progress: number) => void) => {
    try {
      const fileName = `user_${Date.now()}_${file.name}`;
      
      // Simular progreso mientras subimos (30%, 60%, 90% en tiempos diferentes)
      const progressSimulation = setInterval(() => {
        if (onProgress) {
          const random = Math.floor(Math.random() * 100);
          if (random < 30) onProgress(30);
          else if (random < 60) onProgress(60);
          else onProgress(90);
        }
      }, 500);

      const { data, error } = await supabase.storage
        .from('Q10-course')
        .upload(fileName, file);

      clearInterval(progressSimulation);

      if (error) throw error;

      // Al completar, mostrar 100%
      if (onProgress) onProgress(100);

      const { data: publicUrlData } = supabase.storage
        .from('Q10-course')
        .getPublicUrl(data.path);
      
      return publicUrlData.publicUrl;
    } catch (error) {
      if (onProgress) onProgress(0);
      throw error;
    }
}

export { uploadToVault };