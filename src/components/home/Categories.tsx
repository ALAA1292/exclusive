
import React from 'react'
import { getCategories } from '@/services/categories.service';
import {ICategory } from '@/interfaces/category.interface';
import CategoriesSlider from './CategoriesSlider';
import TitleSection from '../shared/TitleSection';

import { Separator } from "@/components/ui/separator"




export default async function Categories() {

    const {data: categories }:{data :ICategory[]}= await getCategories();
  return (
    <section className='py-10'>
      <div className="container mx-auto">
<TitleSection title={"Categories"} subtitle={"Browse By Category"}/>

<CategoriesSlider Categories={categories}/>
<Separator />





      </div>

    </section>
  )
}
