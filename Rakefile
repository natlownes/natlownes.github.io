require 'rake/clean'
require 'haml'
require 'fileutils'
require 'jekyll'

options = Jekyll.configuration({})
site    = Jekyll::Site.new(options)

CLOBBER.include('_site')
CLEAN.include('_layouts/*')

def haml_templates
  file_list = FileList.new('_templates/**/*.haml').
    exclude('_templates/rss/_by_category.haml')

  file_list
end

def templates_dir
  File.join(File.dirname(__FILE__), '_templates')
end

def templates_output_dir
  File.join(File.dirname(__FILE__))
end

def create_output_dirs
  dirs = Dir["#{templates_dir}/**"].map do |path|
    if File.directory?(path)
      path.gsub("#{templates_dir()}/", '')
    end
  end.compact

  dirs.each do |dir_name|
    FileUtils.mkdir_p(File.join(templates_output_dir, dir_name))
  end
end

def compile_templates
  haml_templates().each do |path|
    destination = fs_destination_for_path(path)
    haml        = File.read(path)
    html        = Haml::Engine.new(haml)
    puts "compiling to #{destination}"
    File.open(destination, 'w+') do |file|
      file << html.render()
    end
  end
end

def fs_destination_for_path(path)
  path.gsub('_templates', '').gsub(/\.haml$/,'').gsub(/^\//,'')
end

rule '.html' => ['.haml'] do |t|
  puts t.inspect
  sh %{ bundle exec haml -E utf-8 #{t.source} #{t.name.sub(/_haml\./,'.')} }
end

desc 'compile templates'
task :templates => ['templates:rss', 'templates:build']

desc 'run jekyll with github options'
task :start do
  `jekyll --pygments --no-lsi --safe`
end

namespace :templates do
  desc 'output rss template for each post category'
  task :rss do
    site.read_posts('')

    rss_feed_template = File.read("#{templates_dir}/rss/_by_category.haml")

    site.categories.each do |category_name, posts|
      haml = Haml::Engine.new(rss_feed_template).render(
        site,
        category_name: category_name
      )
      File.open("#{templates_output_dir}/rss/#{category_name}.xml", "w+") do |file|
        file << haml
      end
    end
  end

  task :build => [:clobber, :clean] do
    create_output_dirs
    compile_templates
  end
end

desc 'compile'
task 'less' do
  `cp _site/assets/css/looting.css assets/css/looting.css`
end

desc 'create section indexes if they do not exist'
task :sections do
  site.read_posts('')

  section_template = lambda do |category_name|
    <<-EOS
---
layout: section
is_section: true
---
{% for page in site.categories.#{category_name} %}
  {% assign content = page.content %}
  {% include post.html %}
{% endfor %}
    EOS
  end

  site.categories.each do |category_name, posts|
    FileUtils.mkdir_p(category_name)

    destination = File.join(category_name, 'index.md')
    if !File.exists?(destination)
      File.open(destination, 'w+') do |file|
        file << section_template[category_name]
      end
    end
  end
end

task :server do
  system "jekyll --pygments --no-lsi --safe"
end

desc "Given a title as an argument, create a new post file"

task :write, [:title, :category, :filename] do |t, args|
  filename = args.filename ||
    "#{Time.now.strftime('%Y-%m-%d')}-#{args.title.gsub(/\s/, '-').downcase}.md"
  path = File.join("_posts", filename)
  if File.exist? path; raise RuntimeError.new("Won't clobber #{path}"); end
  File.open(path, 'w') do |file|
    file.write <<-EOS
---
layout: post
categories:
  - #{args.category}
title: #{args.title}
date: #{Time.now.strftime('%Y-%m-%d %k:%M:%S')}
# alias: [/music/index.html]
---
EOS
  end
  puts "#{path}"
end

