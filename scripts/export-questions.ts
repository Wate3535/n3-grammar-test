// questions.ts ni JSON ko'rinishida chiqaradi (audio va PDF generatorlari uchun).
import { questions } from "../questions";

process.stdout.write(JSON.stringify(questions));
