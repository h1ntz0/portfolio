# GitHub Profile Website - AI Execution Plan

## Objective

Membangun GitHub Profile Website yang modern, profesional, interaktif, dan mencerminkan perjalanan sebagai Software Engineer & QA Automation Engineer.

Website harus memiliki tampilan premium, mudah dipelihara, SEO friendly, responsive, dan mudah diperbarui.

---

# AI Working Rules

AI WAJIB mengikuti urutan berikut.

Problem
↓

Requirement Analysis
↓

Architecture
↓

Planning
↓

Task Breakdown
↓

Implementation
↓

Testing
↓

Review
↓

Documentation

Jangan pernah melompati tahapan.

---

# Scope Rules

AI TIDAK BOLEH

- langsung membuat seluruh project
- membuat file yang tidak diperlukan
- mengubah file di luar scope task
- membuat fitur tanpa approval
- melakukan refactor besar tanpa alasan

AI HARUS

- menyelesaikan satu milestone
- meminta approval
- lanjut milestone berikutnya

---

# Milestone

## Phase 1

Project Initialization ✅

Deliverables

- Folder structure
- Tech Stack
- Architecture
- Dependency

---

## Phase 2

Landing Page ✅

Deliverables

- Hero
- Navigation
- Footer
- Responsive Layout

---

## Phase 3

About Me ✅

Deliverables

- Biography
- Skills
- Timeline
- Experience

---

## Phase 4

Projects ✅

Deliverables

- Project Card
- Filter
- GitHub Link
- Live Demo

---

## Phase 5

Learning Journey ✅

Deliverables

- Activity Timeline
- Certifications
- Roadmap

---

## Phase 6

Contact ✅

Deliverables

- Contact Form
- Social Links

---

## Phase 7

Admin ✅ (local-first)

Deliverables

- Login
- Content Management

Note: menggunakan localStorage + env password (`NEXT_PUBLIC_ADMIN_PASSWORD`, default `admin123`). Untuk production, ganti dengan Supabase + Prisma.

---

## Phase 8

Optimization ✅

Deliverables

- SEO (metadata, OpenGraph, JSON-LD, sitemap, robots)
- Lighthouse
- Accessibility (aria labels, semantic headings, focus states)
- Performance (static prerendering, zero console errors)

---

## GitHub Activity (tambahan)

Live GitHub section ✅

- Statistics (public repos, followers, following)
- Recently active repositories via GitHub REST API
- Otomatis tersembunyi jika `githubUsername` kosong di `site-config.ts`

---

# Development Rules

Setiap feature WAJIB memiliki

Purpose

Requirement

User Flow

UI Component

API

Validation

Error Handling

Test Case

Risk Analysis

Definition of Done

---

# Code Rules

Gunakan

- Clean Architecture
- SOLID
- DRY
- KISS
- Reusable Component
- Separation of Concern

---

# QA Checklist

Sebelum task selesai

✔ Happy Path

✔ Negative Test

✔ Responsive

✔ Accessibility

✔ Performance

✔ SEO

✔ Security

✔ Regression

---

# Review Checklist

Sebelum merge

✔ Self Review

✔ Refactor

✔ Dead Code

✔ Duplicate Code

✔ Naming

✔ Folder Structure

✔ Documentation

---

# Output Style

Selalu jawab dengan

Analysis

Planning

Task

Implementation

Testing

Next Step
