import { existsSync, lstatSync, readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

const docsDir = join(process.cwd(), "docs");

export const getArticle = (slug, fields = []) => {
  const filePath = join(docsDir, `${slug}.md`);

  if (!existsSync(filePath)) {
    return null;
  }

  const fileData = readFileSync(filePath, "utf8");
  const { data, content } = matter(fileData);

  const article = {};

  fields.forEach((field) => {
    if (field === "slug") {
      article[field] = slug;
    }

    if (field === "content") {
      article[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      article[field] = data[field];
    }
  });

  return article;
};

export const getArticles = (fields = []) => {
  // Check if docs directory exists
  if (!existsSync(docsDir)) {
    return [];
  }

  // Read all files recursively from docs directory
  const filePaths = readdirSync(docsDir).filter((item) => {
    const currPath = join(docsDir, item);
    return !lstatSync(currPath).isDirectory() && item.endsWith(".md");
  });

  return filePaths?.map((filePath) => getArticle(filePath.replace(/\.md$/, ""), fields)).filter(Boolean);
};
