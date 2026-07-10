import '../new/NewVacation.css'
import { useEffect, useState, type ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useService from '../../../../hooks/use-service'
import type VacationDraft from '../../../../models/VacationDraft'
import { useForm } from 'react-hook-form'
import VacationsService from '../../../../services/auth-aware/admin-only/Vacations'
import { showErrorToast } from '../../../common/show-error-toast'
import { displayDate } from '../../../../utils/dates'


export default function UpdateVacation() {
    const { id } = useParams<{ id: string }>()
    const [loading, setLoading] = useState<boolean>(false)
    const [previewImage, setPreviewImage] = useState<string>('')
    const { register, handleSubmit, watch, setValue, reset, formState } = useForm<VacationDraft>()
    const vacationsService = useService(VacationsService)
    const navigate = useNavigate()
    const normalizeDate = (date: string) => {
        return displayDate(date).split('T')[0];
    }

    // Handle endDate value changes //
    const startDateValue = watch('startDate');
    const endDateValue = watch('endDate');
    useEffect(() => {
        if (startDateValue && endDateValue && startDateValue > endDateValue) {
            setValue('endDate', startDateValue, { shouldValidate: true });
        }
    }, [startDateValue, endDateValue, setValue])
    ///

    async function updateVacation(draft: VacationDraft) {
        try {
            const selectedImage = (draft.imageUrl as unknown as FileList)?.[0]
            if (selectedImage) draft.imageUrl = selectedImage
console.log(selectedImage)
            await vacationsService.updateVacation(id!, draft)
            goBack()
        } catch (error) {
            console.log(error)
            showErrorToast('Failed to update vacation')
        }
    }

    function imageChanged(event: ChangeEvent<HTMLInputElement, HTMLInputElement>): void {
        const file = event.currentTarget.files && event.currentTarget.files[0]
        setPreviewImage(URL.createObjectURL(file!))
    }

    function goBack() {
        navigate('/vacations')
    }

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const { location, description, startDate, endDate, image, price } = await vacationsService.getVacationById(id!)
                setPreviewImage(image)
                reset({ location, description, startDate: normalizeDate(startDate), endDate: normalizeDate(endDate), price })
            } catch (error) {
                showErrorToast('Failed to load vacation data')
            } finally {
                setLoading(false)
            }
        })()
    }, [id, reset])

    return (
        <div className="NewVacation">
            {loading ? (
                <div className="loader">Loading data...</div>
            ) : (
                <form onSubmit={handleSubmit(updateVacation)}>
                    <h3 className='title'>Update vacation</h3>
                    <label htmlFor="location">destination</label>
                    <input type="text"  {...register('location', {
                        required: {
                            value: true,
                            message: 'Destination is required'
                        }
                    })} />
                    <div className='error'>{formState.errors.location?.message}</div>

                    <label htmlFor="description">description</label>
                    <textarea {...register('description', {
                        required: {
                            value: true,
                            message: 'Description is required'
                        }
                    })} />
                    <div className='error'>{formState.errors.description?.message}</div>

                    <label htmlFor="startDate">start on</label>
                    <input type="date" {...register('startDate', {
                        required: {
                            value: true,
                            message: 'Start date is required'
                        }
                    })} />
                    <div className='error'>{formState.errors.startDate?.message}</div>

                    <label htmlFor="endDate">end on</label>
                    <input type="date" min={startDateValue} {...register('endDate', {
                        required: {
                            value: true,
                            message: 'End date is required'
                        },
                        validate: value => !startDateValue || value >= startDateValue || 'End date must not be earlier than the start date'
                    })} />
                    <div className='error'>{formState.errors.endDate?.message}</div>

                    <label htmlFor="price">price</label>
                    <input type="number" min='0' max='10000' {...register('price', {
                        required: {
                            value: true,
                            message: 'Price is required'
                        },
                        min: {
                            value: 0,
                            message: "Price should be real"
                        },
                        max: {
                            value: 10000,
                            message: "Price cannot exceed 10000"
                        }
                    })} />
                    <div className='error'>{formState.errors.price?.message}</div>

                    <label htmlFor="image">cover image</label>
                    <img src={previewImage} />
                    <input type="file" accept="image/jpeg, image/png" {...register('imageUrl')} onChange={imageChanged} />
                    <div className='error'>{formState.errors.imageUrl?.message}</div>

                    {formState.isSubmitting ? (
                        <div className="loader">Loading data...</div>
                    ) : (<>
                        <button type='submit' className='btnSubmit'>Update</button>
                        <button className='btnCancel' onClick={() => goBack()}>Cancel</button>
                    </>
                    )}
                </form>
            )}
        </div>
    )
}