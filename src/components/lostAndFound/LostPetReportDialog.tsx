import { FormEvent, useState } from "react"
import { SafeUser } from "@/types"
// Assuming Button and Textarea are your custom components
import { Button } from "../ui/Button"
import { Textarea } from "../ui/TextArea"
import {   Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription, } from "../ui/Dialog"
import { Calendar } from "../ui/Calendar"
import {   DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup, } from "../ui/DropdownMenu"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/Select"
import { useToast } from "@/hooks/useToast"

interface LostPetReportDialogProps {
    isOpen: boolean;
    onClose: () => void; 
  }

const LostPetReportDialog = ({ isOpen, onClose }: LostPetReportDialogProps) => {
  const [animalType, setAnimalType] = useState("")  
  const [name, setName] = useState("")
  const [sex, setSex] = useState("")
  const [breed, setBreed] = useState("")
  const [message, setMessage] = useState("")
  const [description, setDescription] = useState("")
  const [lastSeenArea, setLastSeenArea] = useState("")
  const [lastSeenDate, setLastSeenDate] = useState<Date | undefined>()
  const [contactDetails, setContactDetails] = useState("")
  const [petImage, setPetImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    const sign = await fetch("/api/cloudinary/cdn-sign?type=post")
    const data = await sign.json()
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${data.cloudname}/auto/upload`
    try {
      const formData = new FormData()
      if (petImage) {
        formData.append("file", petImage)
        formData.append("api_key", data.apikey)
        formData.append("timestamp", data.timestamp.toString())
        formData.append("signature", data.signature)
        formData.append("eager", data.eager)
        formData.append("folder", data.folder)

        const cdnResponse = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
          cache: "no-store",
        })
        const resultImage = await cdnResponse.json()

        const response = await fetch("/api/lostAndFound/createLostPetReport", {
          method: "POST",
          body: JSON.stringify({
            animalType: animalType,
            name: name,
            breed: breed,
            sex: sex,
            message: message,
            description: description,
            lastSeenArea: lastSeenArea,
            lastSeenDate: lastSeenDate,
            contactDetails: contactDetails,
            petImage: resultImage.secure_url,
          }),
        })

        if (!response.ok) {
          throw new Error(
            "Failed to create Missing Pet Report. Please try again.",
          )
        } else {          
          setIsLoading(false)
          toast({
            description: "Missing Pet Report has been successfully created.",
          })                
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => isOpen ? null : onClose()}>
      <DialogPortal>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="DialogContent" style={{ overflowY: "auto" }}>
          <DialogTitle className="DialogTitle">Report Missing Pet</DialogTitle>


        <form onSubmit={onSubmit}>

        <div className="flex gap-4"> 
          <div className="mb-5">
            <label>
              Pet Type
            </label>
          <Select>
          <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Pet Type" />
            <SelectContent>
              <SelectItem value="dog" onSelect={() => setAnimalType("Dog")}> Dog </SelectItem>
              <SelectItem value="cat" onSelect={() => setAnimalType("Cat")}> Cat </SelectItem>
              <SelectItem value="bird" onSelect={() => setAnimalType("Bird")}> Bird </SelectItem>
              <SelectItem value="others" onSelect={() => setAnimalType("Others")}> Others </SelectItem>
            </SelectContent>
            </SelectTrigger>
            </Select>
          </div> 

          <div className="w-[180px] mb-5">
            <label>
              Pet Breed 
              <input name="Pet Breed"       
                    style={{
                    borderWidth: '1px',
                    borderColor: 'black',
                    borderStyle: 'solid',
                    borderRadius: '10px', 
                    height: '40px', 
                    width: '100%', 
                    padding: '0 10px', 
                  }} onChange={(e) => setBreed(e.currentTarget.value)}>
              </input>
            </label>
          </div>

          <div className="w-[180px] mb-5">
            <label>
              Pet Name 
              <input name="Pet Name"       
                style={{
                borderWidth: '1px',
                borderColor: 'black',
                borderStyle: 'solid',
                borderRadius: '10px', 
                height: '40px', 
                width: '100%', 
                padding: '0 10px', 
              }} onChange={(e) => setName(e.currentTarget.value)}>
              </input>
            </label>
          </div>
        </div>

        <div className="mb-5">
            <div>Gender
            <input
              type="radio"
              value="Male"
              name="petSex"
              onChange={(e) => setSex(e.target.value)}
              className="ml-5"
            /> Male
            <input
              type="radio"
              value="Female"
              name="petSex"
              onChange={(e) => setSex(e.target.value)}
              className="ml-5"
            /> Female
            </div>
        </div>

          <div className=" mb-5">
          <div> Message From Owner </div>
          <Textarea
            name="reportMessage"
            required={true}
            onChange={(e) => setMessage(e.currentTarget.value)}
          />
          </div>

          <div className=" mb-5">
          <div> Description </div>          
          <Textarea
            name="reportDescription"
            required={true}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>

        <div className="w-[180px] mb-5">
        <label>
              Area Last Seen
              <input name="Area Found"       
                style={{
                borderWidth: '1px',
                borderColor: 'black',
                borderStyle: 'solid',
                borderRadius: '10px', 
                height: '40px', 
                width: '100%', 
                padding: '0 10px', 
              }} onChange={(e) => setLastSeenArea(e.currentTarget.value)}>
              </input>
          </label>     
        </div>  

          <div className=" mb-5"> 
            <div> Last Seen Date </div>
            <Calendar
                  mode="single"
                  selected={lastSeenDate}
                  onSelect={setLastSeenDate}
                  className="rounded-md border shadow flex justify-center "
              />
            </div>

            <div className="w-[180px] mb-5">

        <label>
              Contact Details
              <input name="Contact Details"       
                style={{
                borderWidth: '1px',
                borderColor: 'black',
                borderStyle: 'solid',
                borderRadius: '10px', 
                height: '40px', 
                width: '100%', 
                padding: '0 10px', 
              }} onChange={(e) => setContactDetails(e.currentTarget.value)}>
              </input>
          </label>     
        </div>  

          <input
            // className="mr-8 ml-20 w-1/4"
            type="file"
            accept="image/*"
            required={true}
            onChange={(e) =>
              setPetImage(e.target.files ? e.target.files[0] : null)
            }
          />
        {/* </div> */}
          
          <div className="flex justify-center">
            <Button className="w-1/6 mt-10 justify-center" type="submit">
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>


        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default LostPetReportDialog
