import { Project, Skill, BlogPost } from './portfolio-data';

export function filterProjects(
  projects: Project[],
  category: string,
  searchQuery: string
): Project[] {
  return projects.filter((project) => {
    const matchesCategory =
      category === 'All' || project.category.toLowerCase() === category.toLowerCase();
    
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    const matchesTitle = project.title.toLowerCase().includes(query);
    const matchesDesc = project.description.toLowerCase().includes(query);
    const matchesTagline = project.tagline.toLowerCase().includes(query);
    const matchesTech = project.technologies.some((tech) =>
      tech.toLowerCase().includes(query)
    );

    return matchesTitle || matchesDesc || matchesTagline || matchesTech;
  });
}

export function filterSkills(
  skills: Skill[],
  category: string,
  searchQuery: string
): Skill[] {
  return skills.filter((skill) => {
    const matchesCategory =
      category === 'All' || skill.category.toLowerCase() === category.toLowerCase();

    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    const matchesName = skill.name.toLowerCase().includes(query);
    const matchesDesc = skill.description.toLowerCase().includes(query);
    const matchesLevel = skill.level.toLowerCase().includes(query);

    return matchesName || matchesDesc || matchesLevel;
  });
}

export function filterBlogPosts(
  posts: BlogPost[],
  category: string,
  searchQuery: string,
  selectedTag?: string
): BlogPost[] {
  return posts.filter((post) => {
    const matchesCategory =
      category === 'All' || post.category.toLowerCase() === category.toLowerCase();

    if (!matchesCategory) return false;

    if (selectedTag && !post.tags.includes(selectedTag)) {
      return false;
    }

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    const matchesTitle = post.title.toLowerCase().includes(query);
    const matchesSummary = post.summary.toLowerCase().includes(query);
    const matchesTags = post.tags.some((t) => t.toLowerCase().includes(query));

    return matchesTitle || matchesSummary || matchesTags;
  });
}
